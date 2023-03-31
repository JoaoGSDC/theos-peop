export const formatDate = (date: string) => {
  const _date = new Date(date);
  const options: any = { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(_date);

  return formattedDate;
};
