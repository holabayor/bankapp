const fs = require('fs');
const csv = require('csv-parser');

const inputFile = './input.csv';
const outputFile = './output.json';

const jsonData = [];

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
    const extractValue = (line, index) =>
      line.split(',')[index].replace(/"/g, '').replace(/\r/g, '');

    const accountNumber = extractValue(inputLines[0], 2); // Remove double quotes and \r from account number
    const accountType = extractValue(inputLines[0], 4); // Remove double quotes and \r from account type
    const customerNumber = extractValue(inputLines[1], 1); // Remove double quotes from customer number
    const accountName = extractValue(inputLines[1], 2); // Remove double quotes from account name
    const currency = extractValue(inputLines[1], 4); // Remove double quotes and \r from currency

    let openingBalance = inputLines[3].replace(/[^0-9.-]/g, ''); // Extract value after comma and remove unwanted characters
    openingBalance = openingBalance.endsWith('-')
      ? parseFloat(openingBalance) * -1
      : parseFloat(openingBalance);

    // jsonData.forEach((transaction) => {
    //   transaction['Value Date'] = new Date(transaction['Value Date']);
    //   transaction['Booking Date'] = new Date(transaction['Booking Date']);
    //     if (transaction['Debit']) {
    //       transaction['Debit'] = parseFloat(transaction['Debit']);
    //     }
    //     if (transaction['Credit']) {
    //       transaction['Credit'] = parseFloat(transaction['Credit']);
    //     }
    //     transaction['Closing Balance'] = parseFloat(
    //       transaction['Closing Balance']
    //     );
    // });

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
