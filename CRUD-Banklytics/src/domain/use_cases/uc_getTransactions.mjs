import { getTransactionsRepo } from "../repositories/getTransactions.mjs";
import ExcelJS from 'exceljs';

const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
};

export const getTransactionsUC = async (user, file, stage) => {
    try {
        const fileData = await getTransactionsRepo(user, file, stage);
        if (fileData.error) {
            return { error: fileData };
        }
        console.log("Vamos a leer el archivo");
        const buffer = await streamToBuffer(fileData.Body);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        // Leer la primera hoja de trabajo
        const worksheet = workbook.getWorksheet(1);
        console.log("Nombre de la hoja", worksheet);
        const jsonData = [];
        const headers = [];
        worksheet.getRow(1).eachCell({ includeEmpty: false }, (cell, colNumber) => {
            headers.push(cell.value);
        });

        // Iterar sobre las filas a partir de la segunda (omitir la primera fila de encabezados)
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber > 1) {
                const rowData = {};
                row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
                    rowData[headers[colNumber - 1]] = cell.value;
                });
                jsonData.push(rowData);
            }
        });

        console.log('Datos del archivo:', jsonData);

        return { transactions: jsonData };
    } catch (error) {
        return { error: error.message };
    }
}