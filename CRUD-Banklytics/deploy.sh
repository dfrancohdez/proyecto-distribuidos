#!/bin/bash

echo "Instalando dependencias..."
npm install

echo "Empaquetando..."
zip -r CRUD-Banklytics.zip index.mjs node_modules/ src/

echo "Subiendo a AWS Lambda..."
aws lambda update-function-code --function-name CRUD-Banklytics-Files --zip-file fileb://CRUD-Banklytics.zip

echo "Despliegue completado."
