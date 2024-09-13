import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export const readCSV = (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        let headers: string[] = [];

        fs.createReadStream(path.resolve(__dirname, filePath))
            .pipe(csv())
            .on('headers', (headerList) => {
                headers = headerList;
            })
            .on('data', (data) => {
                if (headers.length > 0) {
                    const row = headers.reduce((acc, header) => {
                        acc[header] = data[header];
                        return acc;
                    }, {} as any);
                    results.push(row);
                }
            })
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

module.exports = { readCSV };