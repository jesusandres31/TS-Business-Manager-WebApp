import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { usePaymentTypesSelector } from '../../../../../../../../features/extras/paymentTypesSlice';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function PaymentTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('paymentType');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { paymentTypes } = usePaymentTypesSelector(
    (state) => state.paymentTypes
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <TextField
      id="payment-type-id"
      name="payment_type_id"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      select
      label={label}
      required
      value={invoiceForm.payment_type_id}
      onChange={handleInputChange}
    >
      {paymentTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </TextField>
  );
}
