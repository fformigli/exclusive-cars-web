export const PERMISSIONS: { [key: string]: number} = Object.freeze({
  ADMIN_OPTIONS: 1,

  ADMIN_USERS: 2,
  LIST_USERS: 3,
  CREATE_USERS: 4,
  MODIFY_USERS: 5,
  DELETE_USERS: 6,

  ADMIN_CLIENTS: 7,
  CREATE_CLIENTS: 8,
  LIST_CLIENTS: 9,
  MODIFY_CLIENTS: 10,
  DELETE_CLIENTS: 11,

  ADMIN_CONFIGURATIONS: 12,
  LIST_CONFIGURATIONS: 13,
  CREATE_CONFIGURATIONS: 14,
  MODIFY_CONFIGURATIONS: 15,
  DELETE_CONFIGURATIONS: 16,

  ADMIN_WORK_ORDERS: 17,
  LIST_WORK_ORDERS: 18,
  CREATE_WORK_ORDERS: 19,
  MODIFY_WORK_ORDERS: 20,
  DELETE_WORK_ORDERS: 21,

  ADMIN_ROLES: 22,
  LIST_ROLES: 23,
  CREATE_ROLES: 24,
  MODIFY_ROLES: 25,
  DELETE_ROLES: 26,

  ADMIN_BUDGETS: 27,
  CREATE_BUDGETS: 28,
  MODIFY_BUDGETS: 29,
  DELETE_BUDGETS: 30,

  ADMIN_FINANCIAL_MANAGEMENT: 31,
  FINANCIAL_MANAGEMENT_OPTIONS: 32
})