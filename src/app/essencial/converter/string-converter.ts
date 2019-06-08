export const StringConverter = (value: any) => {
  if (value === null || value === undefined || typeof value === 'string'){
    return value;
  }

  return value.toString();
}
