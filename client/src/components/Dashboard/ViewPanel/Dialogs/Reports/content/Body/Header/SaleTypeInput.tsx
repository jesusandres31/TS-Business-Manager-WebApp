import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { useSaleTypesSelector } from '../../../../../../../../features/extras/saleTypesSlice';
import {
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../../features/invoices/invoiceFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

export default function SaleTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('saleType');

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { saleTypes } = useSaleTypesSelector((state) => state.saleTypes);

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
      id="sale-type-id"
      name="sale_type_id"
      variant="outlined"
      size="small"
      style={{ width: 150 }}
      select
      label={label}
      required
      value={invoiceForm.sale_type_id}
      onChange={handleInputChange}
    >
      {saleTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </TextField>
  );
}
