import boto3
import pickle
import os

def load_model_from_s3(bucket_name, model_key, local_path='/tmp/model.pkl'):
    s3 = boto3.client('s3')
    s3.download_file(bucket_name, model_key, local_path)
    with open(local_path, 'rb') as file:
        model = pickle.load(file)
    return model
