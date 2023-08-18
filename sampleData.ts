export const sampleData = {
  accountNumber: '1234567890',
  accountHolder: 'John Doe',
  currency: 'USD',
  balance: 15000,
  transactions: [
    {
      date: '2023-08-01',
      valueDate: '2023-08-01',
      description: 'Salary Deposit',
      amount: 5000,
      type: 'credit',
    },
    {
      date: '2023-08-05',
      valueDate: '2023-08-05',
      description: 'Online Shopping',
      amount: -150,
      type: 'debit',
    },
    {
      date: '2023-08-10',
      valueDate: '2023-08-10',
      description: 'ATM Withdrawal',
      amount: -200,
      type: 'debit',
    },
    {
      date: '2023-08-15',
      valueDate: '2023-08-15',
      description: 'Utility Bill Payment',
      amount: -80,
      type: 'debit',
    },
    {
      date: '2023-08-20',
      valueDate: '2023-08-20',
      description: 'Interest Earned',
      amount: 50,
      type: 'credit',
    },
  ],
};
