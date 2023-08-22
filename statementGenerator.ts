import fs from 'fs';
import csv from 'csv-parser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class StatementGenerator {
  private accountName: string;
  private jsonData: any[];

  constructor(accountName: string) {
    this.accountName = accountName;
    this.jsonData = [];
  }

  private async convertCsvToJson(inputFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(inputFile)
        .pipe(csv({ skipLines: 4 }))
        .on('data', (row) => {
          const filteredRow = {};
          Object.keys(row).forEach((key) => {
            if (
              row[key] !== null &&
              row[key] !== undefined &&
              row[key] !== ''
            ) {
              filteredRow[key] = row[key];
            }
          });
          this.jsonData.push(filteredRow);
        })
        .on('end', () => {
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  private extractValue(line: string, index: number) {
    return line.split(',')[index].replace(/"/g, '').replace(/\r/g, '');
  }

  private async cleanHeader(inputFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readFileSync(inputFile, 'utf-8').split('\n');
    });
  }

  private async generatePdf(): Promise<void> {
    const doc = new jsPDF();

    const tableData = this.jsonData.map((transaction) => {
      // Reformatting transaction data for the table
      return [
        transaction['Value Date'],
        transaction['Booking Date'],
        transaction['Description'],
        transaction['Narration'],
        transaction['Debit'],
        transaction['Credit'],
        transaction['Closing Balance'],
      ];
    });

    doc.text(`Account Statement for ${this.accountName}`, 10, 10);
    doc.autoTable({
      head: [
        [
          'Value Date',
          'Booking Date',
          'Description',
          'Narration',
          'Debit',
          'Credit',
          'Closing Balance',
        ],
      ],
      body: tableData,
    });

    const outputFile = `${this.accountName}_statement.pdf`;
    doc.save(outputFile);
  }

  public async run(inputFile: string): Promise<void> {
    try {
      await this.convertCsvToJson(inputFile);
      await this.generatePdf();
      console.log('PDF statement generated successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Example usage
const accountName = 'DAILY_SAVINGS_SCHEME_4';
const inputFile = './input.csv';

const statementGenerator = new StatementGenerator(accountName);
statementGenerator.run(inputFile);
