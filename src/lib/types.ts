import { Configuration } from "@prisma/client";

export interface IConfigurationList extends Configuration {
  typeName?: string
}

export interface IDataForm {
  cancelPath: string
}

export interface IOption {
  value: string | number,
  label: string
}