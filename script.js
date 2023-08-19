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
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
    console.log('CSV to JSON conversion done.');
  });
