FROM public.ecr.aws/lambda/python:3.10

# Instalar las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente
COPY src/ src/
COPY lambda_function.py .

# Comando de entrada para la Lambda
CMD ["lambda_function.lambda_handler"]
