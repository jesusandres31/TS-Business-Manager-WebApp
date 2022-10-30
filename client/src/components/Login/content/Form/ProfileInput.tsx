import { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
// interface
import { LoginForm } from '../../../../api/auth.services';
// context
import { useLanguage } from '../../../../context/LanguageContext';
// constant
import { loginLength } from '../../../../constants';

interface ProfileInputProps {
  form: LoginForm;
  setForm: React.Dispatch<React.SetStateAction<LoginForm>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProfileInput({
  form,
  setForm,
  setError,
  setHelperText,
}: ProfileInputProps): JSX.Element {
  const {
    dispatch: { translate },
  } = useLanguage();

  const label = translate('profileName');

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
      id="user-profile"
      name="profile"
      value={form.profile}
      onChange={handleInputChange}
      required
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      autoComplete="profile"
      autoFocus
      inputProps={{
        maxLength: loginLength,
      }}
    />
  );
}
