export function getFormattedDateValue(
  date: string,
  locales: string | string[] | readonly string[],
  dateStyle: Intl.DateTimeFormatOptions["dateStyle"],
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat(locales as string | string[], options).format(new Date(date));
}
