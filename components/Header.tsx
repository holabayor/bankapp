import Image from 'next/image';
import React from 'react';
import Logo from './svg/Logo';
import { ModeToggle } from './ModeToggle';

export default function Header() {
  return (
    <nav className="flex items-center">
      <Logo />
      <h1> name microfinance bank</h1>
      <ModeToggle />
    </nav>
  );
}
