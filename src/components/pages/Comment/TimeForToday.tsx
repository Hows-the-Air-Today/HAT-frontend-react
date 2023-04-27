import { formatDistanceToNowStrict } from "date-fns";
import koLocale from "date-fns/locale/ko";

function timeForToday(value: string): string {
  const now = new Date();
  const timeValue = new Date(value);
  const isPast = now > timeValue;

  const diff = Math.abs(now.getTime() - timeValue.getTime());
  const seconds = diff / 1000;

  let formatted;
  if (seconds < 60) {
    formatted = "방금 전";
  } else {
    formatted = formatDistanceToNowStrict(timeValue, {
      addSuffix: true,
      locale: koLocale,
    });
  }

  return isPast ? formatted : `in ${formatted}`;
}

export default timeForToday;
