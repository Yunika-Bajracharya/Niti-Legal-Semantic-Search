import os
import json
import faiss
import textwrap
import requests
from dotenv import load_dotenv
from transformers import DPRQuestionEncoder, DPRQuestionEncoderTokenizerFast

load_dotenv()

class Model:
    def __init__(self):
        self.loaded_index = faiss.read_index('./src/model/index.faiss')
        self.q_encoder = DPRQuestionEncoder.from_pretrained("facebook/dpr-question_encoder-multiset-base")
        self.q_encoder.eval()
        self.q_tokenizer = DPRQuestionEncoderTokenizerFast.from_pretrained("facebook/dpr-question_encoder-multiset-base")

    def query(self, message: str):
        
        # check for hard-coded replies
        self.responses = {
            "hello, i need some assistance. can you help me?": "Bot: Hi there! I am Niti. I`m here to help you with your legal queries. What can I help you with today?",
            "hello": "Bot: Hi there! I am Niti. I`m here to help you with your legal queries. What can I help you with today?",
            "hi": "Bot: Hi there! I am Niti. I`m here to help you with your legal queries. What can I help you with today?",
            "thank you": "Bot: You`re welcome!",
            "what do you do?": "Bot: I`m here to help you with your legal queries. I search for your answers through the legal documents. What can I help you with today?",
            "bye": "Bot: Goodbye! If you ever need any help in the future, feel free to reach out."
        }
        if message.lower() in self.responses:
            return self.responses[message.lower()]

        # tokenized the question
        input_ids = self.q_tokenizer.encode(message, return_tensors="pt")
        
        # run the question through BERT and generate question embedding
        outputs = self.q_encoder(input_ids)

        # embedding is stored in "pooler_output" property
        q_embed = outputs['pooler_output']

        q_embed = q_embed.detach().numpy()

        # find k = 3 most similar pasages to question embedding 'q_embed'
        D, I = self.loaded_index.search(q_embed, k=3)

        print('Closed matching indices: ', I)
        print('Inner Products: ', D)

        with open('./src/model/corpus.json', 'r') as json_file:
            corpus = json.load(json_file)

        # wrap text to 80 characters
        wrapper = textwrap.TextWrapper(width=80)

        # for each of the top 'k' result
                    
        res = ""
        j = 0
        
        for i in I[0]:

            title = corpus['title'][i].split("~")[0] + "\n" + corpus['title'][i].split("~")[1]
            
            passage = corpus['text'][i].replace("'", "`").replace('"', '`').replace("_x0002_", "-")

            # print('Index: ', i)
            # print('Article title: ', title, '\n')
            # print('Passage: ')
            # print(wrapper.fill(passage))
            # print('')
            
            res += title + "\n\n" 
            res += passage + "\n"
            res += '• Inner Product: ' + str(D[0][j]) + '\n' + "_" * 70 + '\n\n' 

            print("product", D[0][j])
            j += 1
            
        print("here", res)
        return ("Bot: " + res)
        