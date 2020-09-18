export default function dateFilter(value, fomat = "date") {
  const options = {};
  if (fomat.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric";
  }
  if (fomat.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }
  return new Intl.DateTimeFormat("ru-Ru", options).format(new Date(value));
}
