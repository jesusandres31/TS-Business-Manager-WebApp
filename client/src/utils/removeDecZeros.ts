export const removeDecZeros = (value: any) => {
  if (value % 1 === 0) {
    value = Math.trunc(value);
  }
  return value;
};
