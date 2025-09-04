export function formatDateWithSeconds(date: Date): string {

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date provided to formatDate.");
    return "Fecha inválida";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
  return formattedDate;
}