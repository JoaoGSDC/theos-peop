import { addDotSeparator } from './addDotSeparator';

export const formatNumberToBRL = (num: number) => {
  const decimalNumber = num.toFixed(2).replace('.', ',');
  const dotSeparatedNumber = addDotSeparator(decimalNumber);

  return `R$ ${dotSeparatedNumber}`;
};
