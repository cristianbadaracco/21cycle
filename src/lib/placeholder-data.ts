import type { BehaviorInstance } from './definitions'

export const CYCLE_BEHAVIORS: BehaviorInstance[] = [
  { id: '1', behavior_id: '1', note: 'estoy bien, fue un gran dia' },
  {
    id: '2',
    behavior_id: '2',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  { id: '3', behavior_id: '1', note: 'estoy bien, fue un gran dia' },
  {
    id: '4',
    behavior_id: '2',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  {
    id: '5',
    behavior_id: '1',
    note: 'estoy bien, fue un gran dia',
  },
  {
    id: '6',
    behavior_id: '2',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  {
    id: '7',
    behavior_id: '1',
    note: 'estoy bien, fue un gran dia',
  },
]
