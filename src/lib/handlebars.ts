import { timeAgo } from "./customTime";
const dateFormat = require('handlebars-dateformat');

const helpers: any = {};

helpers.timeAgo = timeAgo

helpers.formatter = (timestamp: any, format: any) => {
  return dateFormat(timestamp, format);
}

helpers.selectedOption = (a: string, b: string, temp?: string) => {
  return a == b || temp ? "selected" : "";
}

helpers.filetypeValidator = (a: string, b: string) => {
  return a == b;
}

export default helpers