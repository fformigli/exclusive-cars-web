import { IOption } from "../types";

export const getCombosFromTranslateConstants = (constant:{ [key: number | string]: string }) => Object.entries(constant).reduce((options: IOption[], s: [string, string]) => {
  options.push({
    value: s[0],
    label: s[1]
  })
  return options
}, [])