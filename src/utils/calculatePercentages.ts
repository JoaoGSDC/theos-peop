export const calculatePercentagesByTotal = (values: number[]) => {
  const percentage = (values[0] / values[1]) * 100;
  return [percentage, 100 - percentage];
};

export const calculatePercentagesByValues = (values: number[]) => {
  let total = values.reduce((acc, value) => acc + value, 0);
  return values.map((value) => (value / total) * 100);
};
