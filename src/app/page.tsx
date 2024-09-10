import { getAllCycles } from '@/lib/data'
import CyclesList from '@/components/CycleList'
import MobileHeader from '@/components/MobileHeader'

const Home: React.FC = async (): Promise<JSX.Element> => {
  const cycles = await getAllCycles()

  return (
    <main className="flex min-h-screen p-2 flex-col gap-2">
      <MobileHeader title="Inicio" hideIcon />
      <CyclesList cycles={cycles} />
    </main>
  )
}

export default Home
