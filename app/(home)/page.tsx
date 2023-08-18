import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import BankStatementTable from '@/components/Statement';
import { sampleData } from '@/sampleData';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 overflow-hidden">
      <Header />
      <Dashboard />
      <BankStatementTable accountData={sampleData} />
      <Footer />
    </main>
  );
}
