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

export default function DebtText() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('debt');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  return (
    <>
      <TextField
        id="debt"
        name="debt"
        //variant="outlined"
        size="small"
        style={{ width: 150 }}
        label={label}
        required
        value={invoiceForm.debt}
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
      {/* <Typography variant="subtitle1">{`${translate('debt')}:\xa0`}</Typography>
      <Typography variant="subtitle1">{`$${debt.toFixed(2)}`}</Typography> */}
    </>
  );
}
