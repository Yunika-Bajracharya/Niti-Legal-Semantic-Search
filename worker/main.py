

from src.redis.config import Redis
import asyncio
from src.model.gptj import GPT #AI modulee
from src.redis.cache import Cache
from src.redis.config import Redis
from src.redis.stream import StreamConsumer
import os
from src.schema.chat import Message
from src.redis.producer import Producer
import json
import faiss
import textwrap
from transformers import DPRQuestionEncoder, DPRQuestionEncoderTokenizerFast


loaded_index = faiss.read_index('/home/yunika/Desktop/Niti/Niti-Legal-Chatbot/worker/src/model/index.faiss')

q_encoder = DPRQuestionEncoder.from_pretrained("facebook/dpr-question_encoder-multiset-base")
q_tokenizer = DPRQuestionEncoderTokenizerFast.from_pretrained("facebook/dpr-question_encoder-multiset-base")

redis = Redis()


async def main():
    json_client = redis.create_rejson_connection()
    redis_client = await redis.create_connection()
    consumer = StreamConsumer(redis_client)
    cache = Cache(json_client)
    producer = Producer(redis_client)

    print("Stream consumer started")
    print("Stream waiting for new messages")

    while True:
        response = await consumer.consume_stream(stream_channel="message_channel", count=1, block=0)

        if response:
            for stream, messages in response:
                # Get message from stream, and extract token, message data and message id
                for message in messages:
                    message_id = message[0]
                    token = [k.decode('utf-8') for k, v in message[1].items()][0]
                    message = [v.decode('utf-8') for k, v in message[1].items()][0]


                    # Create a new message instance and add to cache, specifying the source as human
                    msg = Message(msg=message)
                    
                    # tokenized the question
                    input_ids = q_tokenizer.encode(message, return_tensors="pt")
                    
                    # run the question through BERT and generate question embedding
                    outputs = q_encoder(input_ids)

                    # embedding is stored in "pooler_output" property
                    q_embed = outputs['pooler_output']

                    q_embed = q_embed.detach().numpy()

                    # find k = 3 most similar pasages to question embedding 'q_embed'
                    D, I = loaded_index.search(q_embed, k=3)

                    print('Closed matching indices: ', I)
                    print('Inner Products: ', D)

                    with open('/home/yunika/Desktop/Niti/Niti-Legal-Chatbot/worker/src/model/corpus.json', 'r') as json_file:
                        corpus = json.load(json_file)

                    # wrap text to 80 characters
                    wrapper = textwrap.TextWrapper(width=80)

                    await cache.add_message_to_cache(token=token, source="human", message_data=msg.dict())

                    # Get chat history from cache
                    data = await cache.get_chat_history(token=token)

                    # Clean message input and send to query
                    message_data = data['messages'][-3:]

                    input = ["" + i['msg'] for i in message_data]
                    input = " ".join(input)

                    # res = " (AI) could solve all the problems on this planet? I am of the opinion that in the short term artificial intelligence is much better than human beings, but in the long and distant future human beings will surpass artificial intelligence.\n\nIn the distant"
                    
                    # for each of the top 'k' result
                    
                    res = ""
                    
                    for i in I[0]:

                        title = corpus['title'][i]
                        passage = corpus['text'][i]

                        print('Index: ', i)
                        print('Article title: ', title, '\n')
                        print('Passage: ')
                        print(wrapper.fill(passage))
                        print('')
                        
                        res += title
                        res += passage
                        
                    print("here", res)

                    msg = Message(
                        msg=res
                    )

                    stream_data = {}
                    stream_data[str(token)] = str(msg.dict())

                    await producer.add_to_stream(stream_data, "response_channel")
                    
                    await cache.add_message_to_cache(token=token, source="bot", message_data=msg.dict())

                # Delete messaage from queue after it has been processed
                await consumer.delete_message(stream_channel="message_channel", message_id=message_id)


if __name__ == "__main__":
    asyncio.run(main())