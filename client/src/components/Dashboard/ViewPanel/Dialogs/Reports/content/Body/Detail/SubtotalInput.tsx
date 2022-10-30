import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useInvoiceDetailFormSelector } from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
// common
import { NumberFormat2ZerosNeg } from '../../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function SubtotalInput() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('subtotal');

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  return (
    <TextField
      id="subtotal"
      name="subtotal"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      label={label}
      required
      value={invoiceDetailForm.subtotal}
      InputProps={{
        inputComponent: NumberFormat2ZerosNeg as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        readOnly: true,
      }}
      inputProps={{
        maxLength: 12,
        autocomplete: 'new-password',
      }}
      disabled={invoiceDetailForm.product_id === ''}
    />
  );
}
