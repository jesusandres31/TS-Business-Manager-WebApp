import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../features/invoices/invoiceFormSlice';
// global state
import { useInvoicesSelector } from '../../../../../../../features/invoices/invoicesSlice';
// common
import { NumberFormat2Zeros } from '../../../../../../../common/NumberFormatCustom';
// hooks
import { useIsPaymentTypeCheckingAcc } from '../../../../common/hooks/useIsPaymentTypeCheckingAcc';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';

export default function PaymentInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('payment');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (invoiceForm.total) {
      if (!e.target.value) {
        dispatch(
          updateInvoiceForm({
            ...invoiceForm,
            payment: 0,
            debt: 0,
          })
        );
      } else {
        let payment = e.target.value as string;
        let debt =
          parseFloat(invoiceForm.total as string) - parseFloat(payment);
        // updating...
        dispatch(
          updateInvoiceForm({
            ...invoiceForm,
            payment: payment,
            debt: debt,
          })
        );
      }
    }
  };

  return (
    <TextField
      id="payment"
      name="payment"
      //variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      required
      value={invoiceForm.payment}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat2Zeros as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      inputProps={{
        maxLength: 12,
      }}
      disabled={invoiceForm.report_details.length === 0}
    />
  );
}
