
from src.adapters.secondary.model_loader.load_model_from_s3 import load_model_from_s3
def predict_use_case(day,month, transaction_amount):
    # Crear DataFrame o lista de características para la predicción
    X_new = [[month, day, transaction_amount]]



    # Configuración del bucket y archivo del modelo
    bucket_name = "modelo-bucket-proyecto"
    model_key = "modelo_entrenado.pkl"

    # Cargar el modelo desde S3
    model = load_model_from_s3(bucket_name, model_key)

    # Realizar la predicción
    prediction = model.predict(X_new)
    prediction_result = prediction[0]  # Si el modelo retorna un array, tomar el primer resultado
    return prediction_result
