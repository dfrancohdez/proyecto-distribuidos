import boto3
import os

class S3Repository:
    def __init__(self):
        self.s3_client = boto3.client("s3")

    def download_file(self, bucket_name, file_key):
        local_file_path = f"/tmp/{os.path.basename(file_key)}"
        self.s3_client.download_file(bucket_name, file_key, local_file_path)
        return local_file_path

    def upload_file(self, bucket_name, file_key, file_path):
        file_key_root=file_key.split("/")
        new_key = f"processed/{file_key_root[1]}"
        self.s3_client.upload_file(file_path, bucket_name, new_key)
