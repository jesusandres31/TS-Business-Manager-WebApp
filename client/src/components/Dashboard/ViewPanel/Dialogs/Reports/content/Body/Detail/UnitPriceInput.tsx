import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  updateInvoiceDetailForm,
  useInvoiceDetailFormSelector,
} from '../../../../../../../../features/invoices/invoiceDetailFormSlice';
// utils
import { calculateSubtotal } from '../../../../../../../../utils/calculateSubtotal';
// common
import { NumberFormat2ZerosNeg } from '../../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function UnitPriceInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('unit_price');

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let unitPrice = e.target.value;
    let subtotal: number = calculateSubtotal(
      unitPrice,
      invoiceDetailForm.units,
      invoiceDetailForm.amount
    );
    // updating...
    dispatch(
      updateInvoiceDetailForm({
        ...invoiceDetailForm,
        [e.target.name]: unitPrice,
        fee_percentage: '',
        subtotal: subtotal,
      })
    );
  };

  return (
    <TextField
      id="unit-price"
      name="unit_price"
      variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      required
      value={invoiceDetailForm.unit_price}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat2ZerosNeg as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      inputProps={{
        maxLength: 12,
      }}
      disabled={invoiceDetailForm.product_id === ''}
    />
  );
}
