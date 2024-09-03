import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'

import MobileHeader from '@/components/MobileHeader'

import { getAllCycles } from '@/lib/data'

interface LayoutProps {
  children: ReactNode
  params: { id: string }
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const { id } = params
  const cycles = await getAllCycles()

  const cycle = cycles.find((cycle) => cycle.id === id)

  if (cycle === undefined) {
    notFound()
  }

  return (
    <div>
      <MobileHeader title={cycle?.name ?? ''} />
      {children}
    </div>
  )
}

export default Layout
