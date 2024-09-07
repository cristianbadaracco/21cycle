export interface User {
  id: string
  name: string
  email?: string
}

export interface Cycle {
  id: string
  start_date: Date
  end_date: Date
  user_id: string
  name?: string
}

export interface Behavior {
  id: string
  name: string
}

export interface BehaviorInstance {
  id: string
  date: Date
  behavior_id: string
  cycle_id: string
  note?: string
}

export interface BehaviorInstanceComplete extends BehaviorInstance {
  name: string
}

export interface Statistic {
  name: string
  value: number
  color: string
}
