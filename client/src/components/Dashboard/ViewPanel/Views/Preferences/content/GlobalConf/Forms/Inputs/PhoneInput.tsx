import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  updateGlobalConfigForm,
  useProfileFormSelector,
} from '../../../../../../../../../features/profile/profileFormSlice';
// context
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// utils
import { removeExtraSpace } from '../../../../../../../../../utils/removeExtraSpace';
// common
import { NumberFormatPhone } from '../../../../../../../../../common/NumberFormatCustom';
// components
import { InputField } from '../../../../../../common/Forms/Inputs';

export default function PhoneInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const label = translate('phone');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        phone: name,
      })
    );
  };

  return (
    <InputField
      id="phone"
      name="phn"
      label={label}
      value={globalConfig.phone}
      onChange={handleInputChange}
      maxLength={50}
      InputProps={{
        inputComponent: NumberFormatPhone as any,
      }}
    />
  );
}
