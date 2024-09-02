export const CYCLE_BEHAVIORS = [
  { behavior: 'good', note: 'estoy bien, fue un gran dia' },
  {
    behavior: 'bad',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  { behavior: 'good', note: 'estoy bien, fue un gran dia' },
  {
    behavior: 'bad',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  { behavior: 'good', note: 'estoy bien, fue un gran dia' },
  {
    behavior: 'bad',
    note: 'estoy para atras wacho, todo mal!!! ojala que aquí mejore sino puente colgante ya te siento 😪',
  },
  { behavior: 'good', note: 'estoy bien, fue un gran dia' },
].map((behavior) => ({
  ...behavior,
  id: generateId(),
}))

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}
