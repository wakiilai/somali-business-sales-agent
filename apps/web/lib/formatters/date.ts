import { formatDistanceToNow, format, parseISO } from "date-fns";

export function relativeTime(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}

export function fullDate(dateString: string): string {
  return format(parseISO(dateString), "MMM d, yyyy — h:mm a");
}

export function shortDate(dateString: string): string {
  return format(parseISO(dateString), "MMM d, h:mm a");
}