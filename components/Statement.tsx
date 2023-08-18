import format from 'date-fns/format';
import React from 'react';

interface Transaction {
  date: string;
  valueDate: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

interface AccountData {
  accountNumber: string;
  accountHolder: string;
  currency: string;
  balance: number;
  transactions: Transaction[];
}

interface Props {
  accountData: AccountData;
}

export default function BankStatementTable({ accountData }: Props) {
  const { transactions, balance } = accountData;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Value Date</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Debit</th>
          <th className="p-2 border">Credit</th>
          <th className="p-2 border">Closing Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="text-center">
            <td className="p-2 border">
              {format(new Date(transaction.date), 'P')}
            </td>
            <td className="p-2 border">
              {format(new Date(transaction.valueDate), 'P')}
            </td>
            <td className="p-2 border">{transaction.description}</td>
            <td className="p-2 border">
              {transaction.type === 'debit' ? transaction.amount : ''}
            </td>
            <td className="p-2 border">
              {transaction.type === 'credit' ? transaction.amount : ''}
            </td>
            <td className="p-2 border">{balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
