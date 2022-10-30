// global state
import { useInvoiceDetailFormSelector } from '../../../../../features/invoices/invoiceDetailFormSlice';
// hooks
import { useExtraTypes } from '../../../../../hooks/useExtraTypes';
import { useProduct } from '../../../../../hooks/useProduct';

export const useIsProductTypeUnit = () => {
  const { indexProductTypeName } = useExtraTypes();

  const { indexProductTypeId } = useProduct();

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  function checkIfProductTypeUnit() {
    return (indexProductTypeName(
      indexProductTypeId(invoiceDetailForm.product_id as number) as number
    ) === 'unit')!!;
  }

  let isProductTypeUnit: boolean = checkIfProductTypeUnit();

  return { isProductTypeUnit };
};
