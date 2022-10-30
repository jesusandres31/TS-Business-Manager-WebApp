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
import { removeSpace } from '../../../../../../../utils/removeSpace';
import { textFielUserOrPsswdVal } from '../../../../../../../utils/textFieldVal';
// components
import { InputField } from '../../../../common/Forms/Inputs';

interface UsernameInputProps {
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UsernameInput({
  error,
  setError,
  helperText,
  setHelperText,
}: UsernameInputProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('username');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeSpace(e.target.value);
    dispatch(
      updateUserForm({
        ...userForm,
        username: name,
      })
    );
    setError(false);
    setHelperText('');
  };

  return (
    <InputField
      id="username"
      name="emanresu"
      label={label}
      required
      value={userForm.username}
      onChange={handleInputChange}
      maxLength={30}
      error={
        (error && helperText.includes('Username')) ||
        textFielUserOrPsswdVal(userForm.username)
      }
      helperText={
        helperText.includes('Username') ? `❌ ${translate(helperText)}` : ''
      }
    />
  );
}
