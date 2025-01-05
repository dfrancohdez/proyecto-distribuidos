class PredictUseCase:
    def __init__(self, model):
        self.model = model

    def predict(self, input_data):
        # Transformar `input_data` si es necesario.
        prediction = self.model.predict([input_data])
        return prediction