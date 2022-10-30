import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
// interface
import { LoginForm } from '../../../../api/auth.services';
// context
import { useLanguage } from '../../../../context/LanguageContext';
// constant
import { loginLength } from '../../../../constants';

interface PasswordInputProps {
  form: LoginForm;
  setForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function PasswordInput({
  form,
  setForm,
  setError,
  setHelperText,
}: PasswordInputProps): JSX.Element {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('password');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setHelperText('');
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TextField
      id="password"
      name="password"
      value={form.password}
      onChange={handleInputChange}
      required
      fullWidth
      label={label}
      variant="outlined"
      type="password"
      margin="normal"
      autoComplete="current-password"
      inputProps={{
        maxLength: loginLength,
      }}
    />
  );
}
