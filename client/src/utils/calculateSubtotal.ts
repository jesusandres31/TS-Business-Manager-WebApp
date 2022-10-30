export const calculateSubtotal = (
  unitPrice: string | number,
  units?: string | number,
  amount?: string | number
) => {
  let subtotal = 0;
  if (amount) {
    subtotal = parseFloat(unitPrice as string) * parseFloat(amount as string);
  } else {
    subtotal = parseFloat(unitPrice as string) * parseFloat(units as string);
  }
  return subtotal;
};
