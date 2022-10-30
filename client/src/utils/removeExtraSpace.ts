export const removeExtraSpace = (str: string) => {
  if (str.length === 1) {
    str = str.replace(/\s/g, ''); // not allow two consecutive spaces
  } else {
    str = str.replace(/ +(?= )/g, ''); // not allow spaces at beginnign
  }
  return str;
};
