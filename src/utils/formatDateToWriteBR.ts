import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export const formatDateWriteBR = (defaultDate: string) => {
  const date = new Date(defaultDate);
  const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt });

  return formattedDate;
};
