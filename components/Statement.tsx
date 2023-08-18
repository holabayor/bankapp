import format from 'date-fns/format';
import React from 'react';

interface Transaction {
  date: string;
  valueDate: string;
  reference: string;
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

  let currentBalance = balance;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Value Date</th>
          <th className="p-2 border">Reference</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Debit</th>
          <th className="p-2 border">Credit</th>
          <th className="p-2 border">Closing Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          const debit = transaction.type === 'debit' ? transaction.amount : 0;
          const credit = transaction.type === 'credit' ? transaction.amount : 0;
          currentBalance = currentBalance + credit - debit;
          return (
            <tr key={index} className="text-center">
              <td className="p-2 border">
                {format(new Date(transaction.date), 'P')}
              </td>
              <td className="p-2 border">
                {format(new Date(transaction.valueDate), 'P')}
              </td>
              <td className="p-2 border">{transaction.reference}</td>
              <td className="p-2 border">{transaction.description}</td>
              <td className="p-2 border">{debit}</td>
              <td className="p-2 border">{credit}</td>
              <td className="p-2 border">{currentBalance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
