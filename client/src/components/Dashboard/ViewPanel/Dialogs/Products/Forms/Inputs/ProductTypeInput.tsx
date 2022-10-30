import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import { useProductTypesSelector } from '../../../../../../../features/extras/productTypesSlice';
import {
  updateProductForm,
  useProductFormSelector,
} from '../../../../../../../features/products/productFormSlice';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function ProductTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('unitOfMeasure');

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const { productTypes } = useProductTypesSelector(
    (state) => state.productTypes
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateProductForm({
        ...productForm,
        product_type_id: e.target.value,
      })
    );
  };

  return (
    <InputField
      id="product_type_id"
      name="product-type-id"
      select
      label={label}
      required
      value={productForm.product_type_id}
      onChange={handleInputChange}
    >
      {productTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </InputField>
  );
}
