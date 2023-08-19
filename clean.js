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

    // Store the first four skipped lines
    for (let i = 0; i < 4; i++) {
      skippedLines.push(inputLines[i]);
    }

    // Write the jsonData and skippedLines to the output JSON file
    fs.writeFileSync(
      outputFile,
      JSON.stringify({ skippedLines, jsonData }, null, 2)
    );
    console.log('CSV to JSON conversion done.');
  });
