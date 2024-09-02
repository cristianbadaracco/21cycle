import Link from 'next/link'

import Navbar from '@/components/Navbar'

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen p-2 flex-col gap-2">
      <Navbar />
      <div>
        <Link href="/cycle/1" className="cursor-pointer text-blue-300">
          Cycle
        </Link>
      </div>
    </main>
  )
}

export default Home
