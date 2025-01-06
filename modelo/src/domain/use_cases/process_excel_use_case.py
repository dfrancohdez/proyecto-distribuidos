from src.adapters.secondary.s3_repository import S3Repository
from src.domain.entities.excel_processor import ExcelProcessor

def process_excel_use_case(bucket_name, file_key):
    # Instanciar repositorio S3
    s3_repo = S3Repository()

    # Descargar archivo desde S3
    file_path = s3_repo.download_file(bucket_name, file_key)
    
    # Procesar archivo Excel
    excel_processor = ExcelProcessor()
    updated_file_path = excel_processor.process_file(file_path)
    
    # Subir archivo actualizado a S3 (sobrescribe el original)
    s3_repo.upload_file(bucket_name, file_key, updated_file_path)