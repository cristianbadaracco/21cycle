import { getAllCycles } from '@/lib/data'
import CyclesList from '@/components/CycleList'

const Home: React.FC = async (): Promise<JSX.Element> => {
  const cycles = await getAllCycles()

  return (
    <main className="flex min-h-screen p-2 flex-col gap-2">
      <h1 className="text-3xl font-bold">Ciclos</h1>
      <CyclesList cycles={cycles} />
    </main>
  )
}

export default Home
