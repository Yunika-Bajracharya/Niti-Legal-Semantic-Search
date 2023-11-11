import os
import asyncio
from src.model.model import Model
from src.redis.cache import Cache
from src.redis.config import Redis
from src.redis.config import Redis
from src.schema.chat import Message
from src.redis.producer import Producer
from src.redis.stream import StreamConsumer

redis = Redis()

async def main():
    json_client = redis.create_rejson_connection()
    redis_client = await redis.create_connection()
    consumer = StreamConsumer(redis_client)
    cache = Cache(json_client)
    producer = Producer(redis_client)

    print("Stream consumer started")
    print("Stream waiting for new messages")
    m = Model()

    while True:
        response = await consumer.consume_stream(stream_channel="message_channel", count=1, block=0)

        if response:
            print("Response",response)
            for stream, messages in response:
                # Get message from stream, and extract token, message data and message id
                for message in messages:
                    message_id = message[0]
                    token = [k.decode('utf-8') for k, v in message[1].items()][0]
                    message = [v.decode('utf-8') for k, v in message[1].items()][0]
                    
                    # Create a new message instance and add to cache, specifying the source as human
                    try:


                        msg = Message(msg=message) 

                        await cache.add_message_to_cache(token=token, source="human", message_data=msg.dict())
                        
                        res = m.query(message = message) 
                        # # Get chat history from cache
                        # data = await cache.get_chat_history(token=token)
                        # print("Data:",data)
                        # # Clean message input and send to query
                        # message_data = data['messages'][-4:]

                        # print(message_data)

                        # input = ["" + i['msg'] for i in message_data]
                        # input = " ".join(input)
                        # print(input)

                        
                        # res = "Ooolaaa"        

                        msg = Message(
                            msg=res
                        )

                        stream_data = {}
                        stream_data[str(token)] = str(msg.dict())

                        await producer.add_to_stream(stream_data, "response_channel")
                        
                        await cache.add_message_to_cache(token=token, source="bot", message_data=msg.dict())   

                    except Exception as e:
                        print("Exception",e)
                        print("Cant find valid token : Token has expired")
                    

                # Delete messaage from queue after it has been processed
                await consumer.delete_message(stream_channel="message_channel", message_id=message_id)


if __name__ == "__main__":
    asyncio.run(main())


