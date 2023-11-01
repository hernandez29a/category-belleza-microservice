/* eslint-disable prettier/prettier */
export enum RabbitMQ {
  CategoryQueue = 'categories',
}

export enum CategoryMSG {
  CREATE = 'CREATE_CATEGORY',
  REGISTER = 'REGISTER_CATEGORY',
  FIND_ALL = 'FIND_CATEGORIES',
  FIND_ONE = 'FIND_CATEGORY',
  UPDATE = 'UPDATE_CATEGORY',
  DELETE = 'DELETE_CATEGORY',
  ADD_PRODUCT = 'ADD_PRODUCT'
}
