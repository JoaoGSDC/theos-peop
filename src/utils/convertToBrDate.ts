export const convertToBrDate = (date: Date) => {
  const generatedDate = new Date(date);

  let convertedDate = generatedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return convertedDate;
};
