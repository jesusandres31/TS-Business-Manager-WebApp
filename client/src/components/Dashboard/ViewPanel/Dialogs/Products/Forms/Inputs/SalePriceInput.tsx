import React, { ChangeEvent } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateProductForm,
  useProductFormSelector,
} from '../../../../../../../features/products/productFormSlice';
// common
import { NumberFormat2Zeros } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// hooks
import { useExtraTypes } from '../../../../../../../hooks/useExtraTypes';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function SalePriceInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const { indexProductTypeName } = useExtraTypes();

  const label = `${translate('salePrice')} ${translate('by')} ${translate(
    indexProductTypeName(productForm.product_type_id as number)
  )}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateProductForm({ ...productForm, sale_price: e.target.value }));
  };

  return (
    <InputField
      id="sale_price"
      name="sl-prc"
      label={label}
      required
      value={productForm.sale_price}
      onChange={handleInputChange}
      maxLength={12}
      InputProps={{
        inputComponent: NumberFormat2Zeros as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
}
