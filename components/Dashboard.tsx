'use client';

import React from 'react';
import { Input } from './ui/input';
import { DatePicker } from './DatePicker';
import { Button } from './ui/button';

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <main>
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-center">
        Welcome to the dashboard
      </h1>
      <div className="flex md:flex-row flex-col w-full items-center">
        <Input
          id="text"
          autoCapitalize="characters"
          maxLength={11}
          placeholder="Account Number"
        />
        <input type="date" name="from" id="from" />
        <DatePicker text={'From'} />
        <DatePicker text={'To'} />
        <Button>Search</Button>
      </div>
    </main>
  );
}
