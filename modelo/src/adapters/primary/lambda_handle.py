import json
from adapters.secondary.model_loader import load_model_from_s3
from domain.use_cases.predict import PredictUseCase

def lambda_handler(event, context):
    # Configuración del bucket y archivo
    bucket_name = "mi-bucket"
    model_key = "modelos/modelo.pkl"

    # Cargar el modelo desde S3
    model = load_model_from_s3(bucket_name, model_key)

    # Crear el caso de uso
    predict_use_case = PredictUseCase(model)

    # Obtener los datos de entrada
    input_data = json.loads(event['body'])

    # Realizar la predicción
    prediction = predict_use_case.predict(input_data)

    # Responder
    return {
        'statusCode': 200,
        'body': json.dumps({'prediction': prediction})
    }
