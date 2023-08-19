import { log } from 'console';
import format from 'date-fns/format';
import React from 'react';

interface Transaction {
  'Value Date': string;
  'Booking Date': string;
  'Txn Ref': string;
  Description: string;
  Narration: string;
  Debit?: any;
  Credit?: any;
  'Closing Balance': string;
}

interface AccountData {
  accountNumber: string;
  accountType: string;
  customerNumber: string;
  accountName: string;
  currency: string;
  openingBalance: number;
  transactions: Transaction[];
}

interface Props {
  accountData: AccountData;
}

export default function BankStatementTable({ accountData }: Props) {
  const { transactions, openingBalance } = accountData;

  let currentBalance = openingBalance;

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="p-2 border">Booking Date</th>
          <th className="p-2 border">Value Date</th>
          <th className="p-2 border">Txn Ref</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Debit</th>
          <th className="p-2 border">Credit</th>
          <th className="p-2 border">Closing Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          const debit =
            parseFloat(transaction['Debit']?.replace(/,/g, '')) || 0;
          console.log(debit);
          const credit =
            parseFloat(transaction['Credit']?.replace(/,/g, '')) || 0;
          currentBalance = currentBalance + credit - debit;
          return (
            <tr key={index} className="text-center">
              <td className="p-2 border">
                {format(new Date(transaction['Booking Date']), 'P')}
              </td>
              <td className="p-2 border">
                {format(new Date(transaction['Value Date']), 'P')}
              </td>
              <td className="p-2 border">{transaction['Txn Ref']}</td>
              <td className="p-2 border">{transaction['Description']}</td>
              <td className="p-2 border">{debit || ''}</td>
              <td className="p-2 border">{credit || ''}</td>
              <td className="p-2 border">{currentBalance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
