import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 overflow-hidden">
      <Header />
      <Dashboard />kw
      <Footer />
    </main>
  )
}
