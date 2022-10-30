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
import { textFieldVal } from '../../../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../../../common/Forms/Inputs';

export default function WebsiteInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('website');

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        website: name,
      })
    );
  };

  return (
    <InputField
      id="website"
      name="wbst"
      label={label}
      value={globalConfig.website}
      onChange={handleInputChange}
      maxLength={80}
      error={textFieldVal(globalConfig.website)}
    />
  );
}
