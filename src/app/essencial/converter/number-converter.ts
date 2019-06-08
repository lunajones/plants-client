export const NumberConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'number') {
    return value;
  }

  return parseFloat(value.toString());
}
