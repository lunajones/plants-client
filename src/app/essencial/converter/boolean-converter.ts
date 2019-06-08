export const BooleanConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'boolean')
    return value;

  return value.toString() === 'true';
}
