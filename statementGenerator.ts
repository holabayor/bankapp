import fs from 'fs';
import csv from 'csv-parser';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

class StatementGenerator {
  private accountName: string;
  private jsonData: Record<string, string>[];
  private openingBalance: Number;
  private accountType: string;
  private customerNumber: string;
  private accountNumber: string;
  private currency: string;

  constructor() {
    this.accountName = '';
    this.accountType = '';
    this.customerNumber = '';
    this.accountNumber = '';
    this.jsonData = [];
    this.openingBalance = 0;
    this.currency = 'NGN';
  }

  private async convertCsvToJson(
    inputFile: string,
    skipLines = 4
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(inputFile)
        .pipe(csv({ skipLines: skipLines }))
        .on('data', (row) => {
          const filteredRow: { [key: string]: string } = {};
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
    try {
      const inputLines = fs.readFileSync(inputFile, 'utf-8').split('\n');

      this.accountName = this.extractValue(inputFile[0], 2);
      this.accountNumber = this.extractValue(inputLines[0], 2); // Remove double quotes and \r from account number
      this.accountType = this.extractValue(inputLines[0], 4); // Remove double quotes and \r from account type
      this.customerNumber = this.extractValue(inputLines[1], 1); // Remove double quotes from customer number
      this.currency = this.extractValue(inputLines[1], 4); // Remove double quotes and \r from currency
      let openingBalance = inputLines[3].replace(/[^0-9.-]/g, ''); // Extract value after comma and remove unwanted characters
      this.openingBalance = openingBalance.endsWith('-')
        ? parseFloat(openingBalance) * -1
        : parseFloat(openingBalance);
    } catch (error: any) {
      console.error(`Error reading file: ${error.message}`);
    }
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
        parseFloat(transaction['Debit'].replace(',', '')) || '',
        parseFloat(transaction['Credit'].replace(',', '')) || '',
        parseFloat(transaction['Closing Balance'].replace(',', '')) || '',
      ];
    });

    doc.text(`Account Statement for ${this.accountName}`, 10, 10);
    autoTable(doc, {
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
      await this.cleanHeader(inputFile);
      await this.generatePdf();
      console.log('PDF statement generated successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Example usage
const inputFile = './input.csv';

const statementGenerator = new StatementGenerator();
statementGenerator.run(inputFile);
