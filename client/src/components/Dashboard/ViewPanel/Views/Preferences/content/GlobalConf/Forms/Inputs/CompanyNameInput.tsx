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

export default function CompanyNameInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('companyName');

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateGlobalConfigForm({
        ...globalConfig,
        company_name: capitalize(name),
      })
    );
  };

  return (
    <InputField
      id="company_name-name"
      name="cmpny_nm"
      label={label}
      required
      value={globalConfig.company_name}
      onChange={handleInputChange}
      maxLength={80}
      error={textFieldVal(globalConfig.company_name)}
    />
  );
}
