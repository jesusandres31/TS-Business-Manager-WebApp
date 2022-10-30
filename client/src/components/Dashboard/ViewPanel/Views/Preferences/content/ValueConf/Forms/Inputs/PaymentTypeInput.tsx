import React, { ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateValueConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../../features/profile/profileFormSlice';
import { usePaymentTypesSelector } from '../../../../../../../../../features/extras/paymentTypesSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import { LongInputField } from '../../../../../../common/Forms/Inputs';

export default function PaymentTypeInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = `${translate('paymentType')} ${translate('byDefault')}`;

  const { valueConfig } = useProfileFormSelector((state) => state.profileForm);

  const { paymentTypes } = usePaymentTypesSelector(
    (state) => state.paymentTypes
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
      id="payment-type-id"
      name="payment_type_id"
      select
      required
      label={label}
      value={valueConfig.payment_type_id}
      onChange={handleInputChange}
    >
      {paymentTypes.map((type) => (
        <MenuItem key={type.id} value={type.id}>
          {translate(type.name)}
        </MenuItem>
      ))}
    </LongInputField>
  );
}
