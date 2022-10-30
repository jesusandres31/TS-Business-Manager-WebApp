import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useInvoiceFormSelector } from '../../../../../../../features/invoices/invoiceFormSlice';
// common
import { NumberFormat2ZerosNeg } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';

export default function TotalText() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('total');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  return (
    <>
      <TextField
        id="total"
        name="total"
        //variant="outlined"
        size="small"
        style={{ width: 150 }}
        label={label}
        required
        value={invoiceForm.total}
        InputProps={{
          inputComponent: NumberFormat2ZerosNeg as any,
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          readOnly: true,
        }}
        inputProps={{
          maxLength: 12,
          autocomplete: 'new-password',
        }}
        disabled={invoiceForm.total === 0}
      />
      {/* <Typography variant="h6">{`${translate('total')}:\xa0`}</Typography>
      <Typography variant="h6">
        {`$${parseFloat(invoiceForm.total as string).toFixed(2)}`}
      </Typography> */}
    </>
  );
}
