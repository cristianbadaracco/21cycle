import { type BehaviorInstance, type Statistic } from '@/lib/definitions'

export const uuidv4 = (): string => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
  )
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}

export const transformBehaviorsToStatistics = (behaviors: BehaviorInstance[]): Statistic[] => {
  if (behaviors.length === 0) {
    return []
  }

  const types = new Set(behaviors.map((behavior) => behavior?.behavior_id))
  const counts = Array.from(types).map((type) => {
    return {
      name: type,
      value: behaviors.filter((behavior) => behavior?.behavior_id === type).length,
      color: getColor(type),
    }
  })

  return counts
}

const getColor = (behavior: string): string => {
  switch (behavior) {
    case 'good':
      return 'success'
    case 'bad':
      return 'danger'
    default:
      return 'black'
  }
}
