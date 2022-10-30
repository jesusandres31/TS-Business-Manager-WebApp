import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateValueConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../../features/profile/profileFormSlice';
import { useProductTypesSelector } from '../../../../../../../../../features/extras/productTypesSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import { LongInputField } from '../../../../../../common/Forms/Inputs';

export default function ProductTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = `${translate('unitOfMeasure')} ${translate('byDefault')}`;

  const { valueConfig } = useProfileFormSelector((state) => state.profileForm);

  const { productTypes } = useProductTypesSelector(
    (state) => state.productTypes
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateValueConfigForm({
        ...valueConfig,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <LongInputField
      id="product-type-id"
      name="product_type_id"
      select
      required
      label={label}
      value={valueConfig.product_type_id}
      onChange={handleInputChange}
    >
      {productTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </LongInputField>
  );
}
