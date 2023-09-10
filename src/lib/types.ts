import { Configuration } from "@prisma/client";

export interface IConfigurationList extends Configuration {
  typeName?: string
}