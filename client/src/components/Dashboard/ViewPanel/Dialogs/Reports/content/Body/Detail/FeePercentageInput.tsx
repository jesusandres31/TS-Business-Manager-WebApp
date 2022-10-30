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
// hooks
import { useIsProductTypeUnit } from '../../../../../common/hooks/useIsProductTypeUnit';
// common
import { NumberFormat2DecNeg } from '../../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function FeePercentageInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { isProductTypeUnit } = useIsProductTypeUnit();

  const label = translate('fee_percentage');

  const { invoiceDetailForm } = useInvoiceDetailFormSelector(
    (state) => state.invoiceDetailForm
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      let subtotal: number = calculateSubtotal(
        invoiceDetailForm.unit_price,
        invoiceDetailForm.units,
        invoiceDetailForm.amount
      );
      dispatch(
        updateInvoiceDetailForm({
          ...invoiceDetailForm,
          [e.target.name]: '',
          subtotal: subtotal,
        })
      );
    } else {
      let feePercentage = e.target.value as string;
      if (!isNaN(parseFloat(feePercentage))) {
        let unitPrice = invoiceDetailForm.unit_price as string;
        let unitsOrAmount = isProductTypeUnit
          ? (invoiceDetailForm.units as string)
          : (invoiceDetailForm.amount as string);
        let alteredPrice = (
          (parseFloat(unitPrice) +
            (parseFloat(unitPrice) * parseFloat(feePercentage)) / 100) *
          parseFloat(unitsOrAmount)
        ).toFixed(2);
        // updating...
        dispatch(
          updateInvoiceDetailForm({
            ...invoiceDetailForm,
            [e.target.name]: feePercentage,
            subtotal: alteredPrice,
          })
        );
      }
    }
  };

  return (
    <TextField
      id="fee-percentage"
      name="fee_percentage"
      variant="outlined"
      size="small"
      autoComplete="off"
      style={{ width: 150 }}
      label={label}
      value={invoiceDetailForm.fee_percentage}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormat2DecNeg as any,
        endAdornment: <InputAdornment position="start">%</InputAdornment>,
      }}
      inputProps={{
        maxLength: 4,
      }}
      disabled={invoiceDetailForm.product_id === ''}
    />
  );
}
