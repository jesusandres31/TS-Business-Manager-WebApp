import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateValueConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../../features/profile/profileFormSlice';
import { useSaleTypesSelector } from '../../../../../../../../../features/extras/saleTypesSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import { LongInputField } from '../../../../../../common/Forms/Inputs';

export default function SaleTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = `${translate('saleType')} ${translate('byDefault')}`;

  const { valueConfig } = useProfileFormSelector((state) => state.profileForm);

  const { saleTypes } = useSaleTypesSelector((state) => state.saleTypes);

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
      id="sale-type-id"
      name="sale_type_id"
      select
      required
      label={label}
      value={valueConfig.sale_type_id}
      onChange={handleInputChange}
    >
      {saleTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </LongInputField>
  );
}
