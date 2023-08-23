'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { DatePicker } from './DatePicker';
import { Button } from './ui/button';

export default function Dashboard() {
  const [accountNumber, setAccountNumber] = useState('');
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const handleGeneratePDF = async () => {
    try {
      const response = await fetch('/api/generate-statement', {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Statement generation started.');
      } else {
        console.error('Error starting statement generation.');
      }
    } catch (error) {
      console.error('Error generating PDF statement:', error);
    }
  };

  return (
    <main>
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center">
        Welcome to the dashboard
      </h1>
      <div className="flex md:flex-row flex-col w-full items-center gap-4">
        <Input
          type="text"
          id="account"
          autoCapitalize="on"
          maxLength={11}
          value={accountNumber}
          onChange={(e) => {
            setAccountNumber(e.target.value);
          }}
          placeholder="Account Number"
          className="w-full md:w-1/2"
        />
        <DatePicker text={'From'} />
        <DatePicker text={'To'} />
        <Button size={'lg'} className="w-1/4 font-semibold">
          Search
        </Button>
        <Button size={'lg'} onClick={() => {}} className="w-1/4 font-semibold">
          Download
        </Button>
      </div>
    </main>
  );
}
