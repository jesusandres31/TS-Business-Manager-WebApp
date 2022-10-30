import { ChangeEvent } from 'react';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateUserForm,
  useUserFormSelector,
} from '../../../../../../../features/users/userFormSlice';
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

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('phone');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateUserForm({
        ...userForm,
        phone: name,
      })
    );
  };

  return (
    <InputField
      id="phone"
      name="phn"
      label={label}
      value={userForm.phone}
      onChange={handleInputChange}
      InputProps={{
        inputComponent: NumberFormatPhone as any,
      }}
      maxLength={50}
    />
  );
}
