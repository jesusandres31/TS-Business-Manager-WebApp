// global state
import { useInvoiceFormSelector } from '../../../../../features/invoices/invoiceFormSlice';
// hooks
import { useExtraTypes } from '../../../../../hooks/useExtraTypes';

export const useIsPaymentTypeCheckingAcc = () => {
  const { indexPaymentTypeName } = useExtraTypes();

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  function checkIfPaymentTypeCheckingAcc() {
    return (indexPaymentTypeName(invoiceForm.payment_type_id as number) ===
      'checking_account')!!;
  }

  let isPaymentTypeCheckingAcc: boolean = checkIfPaymentTypeCheckingAcc();

  return { isPaymentTypeCheckingAcc };
};
