#!/bin/bash

echo "Instalando dependencias..."
npm install

echo "Empaquetando..."
zip -r UserBanklytics.zip index.mjs node_modules/ src/

echo "Subiendo a AWS Lambda..."
aws lambda update-function-code --function-name UserBanklytics --zip-file fileb://UserBanklytics.zip

echo "Despliegue completado."
