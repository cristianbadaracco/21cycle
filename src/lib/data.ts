'use server'

import { sql } from '@vercel/postgres'

import type { Behavior, BehaviorInstance, BehaviorInstanceComplete, Cycle } from './definitions'

export const getAllBehaviors = async (): Promise<Behavior[]> => {
  const result = await sql`select * from behavior`
  return result.rows as Behavior[]
}

export const getAllBehaviorInstances = async (): Promise<BehaviorInstance[]> => {
  const result = await sql`select * from behavior_instance`
  return result.rows as BehaviorInstance[]
}

export const getAllBehaviorInstancesComplete = async (): Promise<BehaviorInstanceComplete[]> => {
  const result = await sql`SELECT bi.*, b.name FROM behavior_instance as bi, behavior as b
WHERE bi.behavior_id = b.id`
  return result.rows as BehaviorInstanceComplete[]
}

export const getAllCycles = async (): Promise<Cycle[]> => {
  const result = await sql`select * from cycle`
  return result.rows as Cycle[]
}

export const updateBehaviorInstance = async (behavior: BehaviorInstance): Promise<BehaviorInstance | null> => {
  const result = await sql`
    UPDATE behavior_instance 
    SET note = ${behavior.note} 
    WHERE id = ${behavior.id}
    RETURNING *;
  `

  console.log('RESULT', result)

  if (result !== null && result.rowCount > 0) {
    return result.rows[0] as BehaviorInstance
  } else {
    return null
  }
}

export const addBehaviorInstance = async (behavior: BehaviorInstance): Promise<BehaviorInstance | null> => {
  const result = await sql`
    INSERT INTO behavior_instance (behavior_id, note, date, cycle_id) VALUES (${behavior.behavior_id}, ${behavior?.note}, ${behavior.date.toISOString()}, ${behavior.cycle_id}) RETURNING *;
  `
  if (result !== null && result.rowCount > 0) {
    return result.rows[0] as BehaviorInstance
  } else {
    return null
  }
}
