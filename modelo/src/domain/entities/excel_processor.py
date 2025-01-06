import pandas as pd
import os
from src.domain.use_cases.predict_use_case import predict_use_case
class ExcelProcessor:
    def process_file(self, file_path):
        # Leer archivo Excel
        df = pd.read_excel(file_path)
        df['Fecha'] = pd.to_datetime(df['Fecha'], format='%Y-%m-%d', errors='coerce')

        
        df['year'] = df['Fecha'].dt.year
        df['month'] = df['Fecha'].dt.month
        df['day'] = df['Fecha'].dt.day
        # Validar columnas requeridas
        required_columns = ["month", "day", "Monto"]
        if not all(col in df.columns for col in required_columns):
            raise ValueError("El archivo no contiene las columnas requeridas")
        
        # Procesar filas y agregar una nueva columna
        df["Clase"] = df.apply(lambda row: self._process_row(row), axis=1)

        # Guardar archivo actualizado
        updated_file_path = f"/tmp/updated_{os.path.basename(file_path)}"
        df.to_excel(updated_file_path, index=False)

        return updated_file_path

    def _process_row(self, row):
        # Lógica personalizada para procesar cada fila
        month = row["month"]
        day = row["day"]
        transaction_amount = row["Monto"]

        result=predict_use_case(day,month,transaction_amount)
        # Ejemplo de cálculo
        return f"{result}"
