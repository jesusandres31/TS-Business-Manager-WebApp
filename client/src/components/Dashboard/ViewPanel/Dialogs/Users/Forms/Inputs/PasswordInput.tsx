import { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  updateUserForm,
  useUserFormSelector,
} from '../../../../../../../features/users/userFormSlice';
// mui
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// utils
import { removeExtraSpace } from '../../../../../../../utils/removeExtraSpace';
import { textFielUserOrPsswdVal } from '../../../../../../../utils/textFieldVal';

export default function PasswordInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('password');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = removeExtraSpace(e.target.value);
    dispatch(
      updateUserForm({
        ...userForm,
        password: name,
      })
    );
  };

  return (
    <TextField
      id="standard-password-input"
      name="psswrd"
      label={label}
      required
      value={userForm.password}
      onChange={handleInputChange}
      inputProps={{
        maxLength: 30,
      }}
      style={{ width: 210 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle-password-visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={textFielUserOrPsswdVal(userForm.password)}
      type={showPassword ? 'text' : 'password'}
    />
  );
}
