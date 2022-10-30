import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateProviderForm,
  useProviderFormSelector,
} from '../../../../../../../features/providers/providerFormSlice';
// common
import { NumberFormatPhone } from '../../../../../../../common/NumberFormatCustom';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function PhoneInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { providerForm } = useProviderFormSelector(
    (state) => state.providerForm
  );

  const label = translate('phone');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateProviderForm({
        ...providerForm,
        phone: name,
      })
    );
  };

  return (
    <InputField
      id="phone"
      name="phn"
      label={label}
      value={providerForm.phone}
      onChange={handleInputChange}
      maxLength={50}
      InputProps={{
        inputComponent: NumberFormatPhone as any,
      }}
    />
  );
}
