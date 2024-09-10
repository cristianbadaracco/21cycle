'use server'

import { sql } from '@vercel/postgres'

import type { Behavior, BehaviorInstance, BehaviorInstanceComplete, Cycle } from './definitions'

// BEHAVIOR
export const getAllBehaviors = async (): Promise<Behavior[]> => {
  const result = await sql`select * from behavior`
  return result.rows as Behavior[]
}

// BEHAVIOR INSTANCE

export const getAllBehaviorInstances = async (): Promise<BehaviorInstance[]> => {
  const result = await sql`select * from behavior_instance`
  return result.rows as BehaviorInstance[]
}

export const updateBehaviorInstance = async (behavior: BehaviorInstance): Promise<BehaviorInstance | null> => {
  const result = await sql`
    UPDATE behavior_instance 
    SET note = ${behavior.note} 
    WHERE id = ${behavior.id}
    RETURNING *;
  `

  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }

  return result.rows[0] as BehaviorInstance
}

export const addBehaviorInstance = async (behavior: BehaviorInstance): Promise<BehaviorInstance | null> => {
  const result = await sql`
    INSERT INTO behavior_instance (behavior_id, note, date, cycle_id) VALUES (${behavior.behavior_id}, ${behavior?.note}, ${behavior.date.toISOString()}, ${behavior.cycle_id}) RETURNING *;
  `

  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }

  return result.rows[0] as BehaviorInstance
}

export const removeBehaviorInstance = async (id: string): Promise<BehaviorInstance | null> => {
  const result = await sql`DELETE FROM behavior_instance WHERE id = ${id} RETURNING *;`
  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }
  return result.rows[0] as BehaviorInstance
}

// BEHAVIOR COMPLETE
export const getAllBehaviorInstancesComplete = async (): Promise<BehaviorInstanceComplete[]> => {
  const result = await sql`SELECT bi.*, b.name FROM behavior_instance as bi, behavior as b
WHERE bi.behavior_id = b.id`
  return result.rows as BehaviorInstanceComplete[]
}

// CYCLE
export const getAllCycles = async (): Promise<Cycle[] | null> => {
  const result = await sql`select * from cycle`
  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }
  return result.rows as Cycle[]
}

export const addCycle = async (cycle: Cycle): Promise<Cycle | null> => {
  const result = await sql`
    INSERT INTO cycle (start_date, end_date, user_id, name) VALUES (${cycle.start_date.toISOString()}, ${cycle.end_date.toISOString()}, ${cycle.user_id}, ${cycle.name}) RETURNING *;
  `
  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }
  return result.rows[0] as Cycle
}

export const removeCycle = async (id: string): Promise<Cycle | null> => {
  const result = await sql`
    DELETE FROM cycle WHERE id = ${id} RETURNING *;`

  if (result.rowCount === null || result.rowCount === undefined || result.rowCount === 0) {
    return null
  }
  return result.rows[0] as Cycle
}
