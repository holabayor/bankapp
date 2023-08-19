const fs = require('fs');
const csv = require('csv-parser');

const inputFile = './input.csv';
const outputFile = './output.json';

const jsonData = [];
const skippedLines = [];

fs.createReadStream(inputFile)
  .pipe(csv({ skipLines: 4 })) // Skip first 4 lines (starting from the 5th row)
  .on('data', (row) => {
    // Filter out columns with null values in the 5th row
    const filteredRow = {};
    Object.keys(row).forEach((key) => {
      if (row[key] !== null && row[key] !== undefined && row[key] !== '') {
        filteredRow[key] = row[key];
      }
    });
    jsonData.push(filteredRow);
  })
  .on('end', () => {
    // Read the skipped lines from the input file
    const inputLines = fs.readFileSync(inputFile, 'utf-8').split('\n');

    // Extract specific values from skipped lines
    const accountNumber = inputLines[0].split(',')[2].replace(/"/g, ''); // Remove double quotes from account number
    const accountType = inputLines[0].split(',')[4].replace(/"/g, ''); // Remove double quotes from account type
    const customerNumber = inputLines[1].split(',')[1].replace(/"/g, ''); // Remove double quotes from customer number
    const accountName = inputLines[1].split(',')[2].replace(/"/g, ''); // Remove double quotes from account name
    const currency = inputLines[1].split(',')[4].replace(/"/g, ''); // Remove double quotes from currency
    let openingBalance = inputLines[3].replace(/[^0-9.-]/g, ''); // Extract value after comma and remove unwanted characters
    openingBalance = openingBalance.endsWith('-')
      ? parseFloat(openingBalance) * -1
      : parseFloat(openingBalance);

    // Create an object with the extracted values
    const finalData = {
      accountNumber,
      accountType,
      customerNumber,
      accountName,
      currency,
      openingBalance,
      transactions: jsonData,
    };

    // Write the jsonData, skippedLines, and additionalInfo to the output JSON file
    fs.writeFileSync(outputFile, JSON.stringify(finalData, null, 2));
    console.log('CSV to JSON conversion done.');
  });
