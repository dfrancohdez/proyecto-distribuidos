from src.domain.use_cases.process_excel_use_case import process_excel_use_case
import json
def lambda_handler(event, context):
    try:
        # Extraer bucket y key del evento
        records = event["Records"]
        bucket_name_doc = records[0]["s3"]["bucket"]["name"]
        file_key_doc = records[0]["s3"]["object"]["key"]
        # Llamar al caso de uso
        process_excel_use_case(bucket_name_doc, file_key_doc)
        return {
                "statusCode": 200,
                "body": json.dumps("Archivo procesado correctamente")
            }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps(f"Error procesando el archivo: {str(e)}")
        }


