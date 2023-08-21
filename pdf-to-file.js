const fs = require('fs');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');

// Load the JSON data from a file
const jsonData = fs.readFileSync('output.json', 'utf-8');
const accountData = JSON.parse(jsonData);

// Rearrange the columns if needed
// Rearrange the columns if needed
const rearrangedTransactions = accountData.transactions.map((transaction) => {
  // Rearrange transaction properties as needed
  return {
    'Value Date': transaction['Value Date'],
    Description: transaction['Description'],
    'Txn Ref': transaction['Txn Ref'],
    Narration: transaction['Narration'],
    'Booking Date': transaction['Booking Date'],
    Debit: parseFloat(transaction['Debit'] || '0'),
    Credit: parseFloat(transaction['Credit'] || '0'),
    'Closing Balance': parseFloat(transaction['Closing Balance'] || '0'),
  };
});

// Create a new jsPDF instance
const doc = new jsPDF();

// Add account information
doc.setFontSize(16);
doc.text('Account Statement', 10, 10);

doc.setFontSize(12);
doc.text(`Account Number: ${accountData.accountNumber}`, 10, 20);
doc.text(`Account Name: ${accountData.accountName}`, 10, 30);
doc.text(`Opening Balance: ${accountData.openingBalance.toFixed(2)}`, 10, 40);

// Define column headers for the table
const columnHeaders = [
  'Value Date',
  'Booking Date',
  'Description',
  'Narration',
  'Debit',
  'Credit',
  'Closing Balance',
];

// Convert transaction data to an array of arrays
const transactionsArray = rearrangedTransactions.map((transaction) => {
  return [
    transaction['Value Date'],
    transaction['Description'],
    transaction['Narration'],
    transaction['Booking Date'],
    transaction['Debit'],
    transaction['Credit'],
    transaction['Closing Balance'],
  ];
});

// Add a table to the PDF using autoTable function
doc.autoTable({
  head: [columnHeaders],
  body: transactionsArray,
  startY: 50,
});

// Save the PDF to a file
doc.save('account_statement.pdf');
