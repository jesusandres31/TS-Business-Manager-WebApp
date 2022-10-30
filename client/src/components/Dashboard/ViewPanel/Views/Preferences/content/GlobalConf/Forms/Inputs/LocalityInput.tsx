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
import { capitalize } from '../../../../../../../../../utils/capitalize';
import { removeExtraSpace } from '../../../../../../../../../utils/removeExtraSpace';
import { textFieldVal } from '../../../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../../../common/Forms/Inputs';

export default function LocalityInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('locality');

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(capitalize(e.target.value));
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        locality: name,
      })
    );
  };

  return (
    <InputField
      id="locality"
      name="lclty"
      label={label}
      value={globalConfig.locality}
      onChange={handleInputChange}
      maxLength={50}
      error={textFieldVal(globalConfig.locality)}
    />
  );
}
