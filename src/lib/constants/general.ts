export const DEFAULT_TIMEZONE: string = 'America/Asuncion'

export const WORK_ORDER_STATES: { [key: string]: number } = Object.freeze({
  NEW: 1,
  ASSIGNED: 2
})

export const BUDGET_STATES: { [key: string]: number } = Object.freeze({
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3,
  EXPIRED: 4,
  CHECKOUT: 5,
  PAID: 6
})

export const USER_TYPES: { [key: string]: number } = Object.freeze({
  EMPLOYEE: 1,
  CLIENT: 2
})

export const CONFIGURATION_TYPES: { [key: string]: number } = Object.freeze({
  DOCUMENT_TYPES: 1,
  FUEL_LEVELS: 2
})