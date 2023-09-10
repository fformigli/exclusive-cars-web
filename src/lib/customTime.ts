import dayjs from "dayjs";
import es from "dayjs/locale/es"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import { DEFAULT_TIMEZONE } from "./constants/general";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale(es)
dayjs.tz.setDefault(DEFAULT_TIMEZONE)

export const timeAgo = (from: any) => {
  console.log(from)
  return dayjs.tz(from).fromNow(false)
}