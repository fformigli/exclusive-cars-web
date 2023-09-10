export const DEFAULT_TIMEZONE: string = 'America/Asuncion'

export const WORK_ORDER_STATES: { [key: string]: number} = Object.freeze({
  NEW: 1,
  ASSIGNED: 2
})

export const USER_TYPES: { [key: string]: number} = Object.freeze({
  EMPLOYEE: 1,
  CLIENT: 2
})