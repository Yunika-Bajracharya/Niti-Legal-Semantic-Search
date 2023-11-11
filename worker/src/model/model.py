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

            title = ''.join([i for i in corpus['title'][i] if not i.isdigit()])
            passage = corpus['text'][i].replace("'", "`").replace('"', '`')

            # print('Index: ', i)
            # print('Article title: ', title, '\n')
            # print('Passage: ')
            # print(wrapper.fill(passage))
            # print('')
            
            res += title + '\n'
            res += passage + '\n'
            res += 'Inner Product: ' + str(D[0][j]) + '\n\n'

            print("product", D[0][j])
            j += 1
            
        print("here", res)
        return res
        