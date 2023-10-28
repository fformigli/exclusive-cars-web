import { timeAgo } from "./customTime";
import { checkUserPermissions } from "./auth";

const dateFormat = require('handlebars-dateformat');

const helpers: any = {};

helpers.timeAgo = timeAgo

helpers.formatter = (timestamp: any, format: any) => {
  return dateFormat(timestamp, format);
}

helpers.selectedOption = (a: string, b: string) => a == b ? "selected" : "";

helpers.checkedOption = (a: number, b: string) =>
  String(b)?.split(',').includes(String(a)) ? "checked" : ""

helpers.filetypeValidator = (a: string, b: string) => a == b

helpers.checkAccess = (userPermissions: any, requiredPermissions: any) =>
  checkUserPermissions(userPermissions, requiredPermissions.split(',').map((rp: string) => +rp))

helpers.translateLabel = (TRANSLATIONS: {
  [key: string | number]: string
}, value: string | number) => TRANSLATIONS[value] ?? value

export default helpers