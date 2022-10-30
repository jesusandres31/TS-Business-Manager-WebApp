import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateUserForm,
  useUserFormSelector,
} from '../../../../../../../features/users/userFormSlice';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { capitalize } from '../../../../../../../utils/capitalize';
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { textFieldVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function LocalityInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('locality');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(capitalize(e.target.value));
    dispatch(
      updateUserForm({
        ...userForm,
        locality: name,
      })
    );
  };

  return (
    <InputField
      id="locality"
      name="lclty"
      label={label}
      value={userForm.locality}
      onChange={handleInputChange}
      maxLength={50}
      error={textFieldVal(userForm.locality)}
    />
  );
}
