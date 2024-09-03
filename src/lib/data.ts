import { sql } from '@vercel/postgres'

import type { Behavior, Cycle } from './definitions'

export const getAllBehaviors = async (): Promise<Behavior[]> => {
  const result = await sql`select * from behavior`
  return result.rows as Behavior[]
}

export const getAllCycles = async (): Promise<Cycle[]> => {
  const result = await sql`select * from cycle`
  return result.rows as Cycle[]
}
