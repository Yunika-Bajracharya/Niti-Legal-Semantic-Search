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
        self.loaded_index = faiss.read_index('/home/yunika/Desktop/Niti/Niti-Legal-Chatbot/worker/src/model/index.faiss')
        self.q_encoder = DPRQuestionEncoder.from_pretrained("facebook/dpr-question_encoder-multiset-base")
        self.q_tokenizer = DPRQuestionEncoderTokenizerFast.from_pretrained("facebook/dpr-question_encoder-multiset-base")

    def query(self, message: str):
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

        with open('/home/yunika/Desktop/Niti/Niti-Legal-Chatbot/worker/src/model/corpus.json', 'r') as json_file:
            corpus = json.load(json_file)

        # wrap text to 80 characters
        wrapper = textwrap.TextWrapper(width=80)

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
        return res
        