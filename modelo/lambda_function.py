import json
from src.adapters.secondary.model_loader.load_model_from_s3 import load_model_from_s3

def lambda_handler(event, context):
    # Configuración del bucket y archivo del modelo
    bucket_name = "modelo-bucket-proyecto"
    model_key = "modelo_entrenado.pkl"

    # Cargar el modelo desde S3
    model = load_model_from_s3(bucket_name, model_key)

    # Obtener datos de entrada del body
    #if 'body' not in event:
    #    return {
    #        'statusCode': 400,
    #        'body': json.dumps({'error': event})
    #    }

    try:
        #input_data = json.loads(event)  # Parsear JSON desde el body

        
        month = event['month']
        day = event['day']
        transaction_amount = event['Transaction Amount']
    except (KeyError, ValueError) as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Invalid input: {str(e)}'})
        }

    # Crear DataFrame o lista de características para la predicción
    X_new = [[month, day, transaction_amount]]

    # Realizar la predicción
    try:
        prediction = model.predict(X_new)
        prediction_result = prediction[0]  # Si el modelo retorna un array, tomar el primer resultado
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Prediction failed: {str(e)}'})
        }

    # Responder con el resultado
    return {
        'statusCode': 200,
        'body': json.dumps({'prediction': prediction_result})
    }