#!/bin/bash

echo "Instalando dependencias..."
npm install

echo "Empaquetando..."
zip -r UploadBanklytics.zip index.mjs node_modules/

echo "Subiendo a AWS Lambda..."
aws lambda update-function-code --function-name UploadBanklytics --zip-file fileb://UploadBanklytics.zip

echo "Despliegue completado."
