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
import { emailVal } from '../../../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../../../common/Forms/Inputs';

export default function EmailInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const label = translate('email');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        email: name,
      })
    );
  };

  return (
    <InputField
      id="email"
      name="mal"
      label={label}
      value={globalConfig.email}
      onChange={handleInputChange}
      maxLength={50}
      error={emailVal(globalConfig.email)}
    />
  );
}
