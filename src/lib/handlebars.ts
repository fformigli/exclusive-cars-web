import { timeAgo } from "./customTime";
import { checkUserPermissions } from "./auth";
import { getCombosFromTranslateConstants } from "./constants/functions";

const dateFormat = require('handlebars-dateformat');

const helpers: any = {};

helpers.timeAgo = timeAgo

helpers.dateFormatter = (timestamp: any, format: any) => {
  const result = dateFormat(timestamp, format);
  if(result == 'Invalid date') {
    return '-'
  }
  return result
}

helpers.currencyFormatter = (amount: string = "0") => {
  const pattern = /(-?\d+)(\d{3})/
  const format = (a: any) => a.toString().replace(pattern, "$1.$2")
  amount = amount.toString()
  while (pattern.test(amount)) {
    amount = format(amount)
  }
  return `${amount} Gs.`
}

helpers.selectedOption = (a: string, b: string) => a == b ? "selected" : "";

helpers.checkedOption = (a: number, b: string) =>
  String(b)?.split(',').includes(String(a)) ? "checked" : ""

helpers.filetypeValidator = (a: string, b: string) => a == b

helpers.checkAccess = (userPermissions: any, requiredPermissions: any) =>
  checkUserPermissions(userPermissions, requiredPermissions.split(',').map((rp: string) => +rp))

helpers.translateLabel = (TRANSLATIONS: {
  [key: string | number]: string
} = {}, value: string | number) => TRANSLATIONS[value] ?? value

helpers.multiply = (a: number, b: number) => BigInt(a) * BigInt(b)

helpers.fixIndex = (a: number) => ++a

helpers.eq = (a: string, b: string) => a == b

helpers.ne = (a: string, b: string) => a != b

helpers.combofyTranslateConstant = (constant:{ [key: number | string]: string }) => getCombosFromTranslateConstants(constant)

export default helpers