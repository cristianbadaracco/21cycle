'use client'

import { useRouter } from 'next/navigation'

import { formatDate } from '@/lib/utils'
import type { Cycle } from '@/lib/definitions'

interface Props {
  cycles: Cycle[]
}
const CyclesList: React.FC<Props> = ({ cycles = [] }) => {
  const router = useRouter()

  return (
    <div>
      {cycles.map((cycle) => (
        <div
          className=" p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 my-2 shadow-md"
          key={cycle.id}
        >
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cycle.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {`${formatDate(cycle?.start_date)} - ${formatDate(cycle?.end_date)}`}
          </p>
          <div
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              router.push(`/cycle/${cycle.id}`)
            }}
          >
            Ver más
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CyclesList
