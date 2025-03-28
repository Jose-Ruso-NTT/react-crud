function formatDate(date: string, locale = "es-ES"): string {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return dateObj.toLocaleDateString(locale, options);
}

export default formatDate;
