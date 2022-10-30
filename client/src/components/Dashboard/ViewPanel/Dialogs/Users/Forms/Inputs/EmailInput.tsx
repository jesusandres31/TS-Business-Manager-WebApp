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
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { emailVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

interface EmailInputProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmailInput({
  error,
  setError,
  helperText,
  setHelperText,
}: EmailInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('email');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateUserForm({
        ...userForm,
        email: name,
      })
    );
    setError(false);
    setHelperText('');
  };

  return (
    <InputField
      id="email"
      name="liame"
      label={label}
      value={userForm.email}
      onChange={handleInputChange}
      maxLength={50}
      error={
        (error && helperText.includes('Email')) || emailVal(userForm.email)
      }
      helperText={
        helperText.includes('Email') ? `❌ ${translate(helperText)}` : ''
      }
    />
  );
}
