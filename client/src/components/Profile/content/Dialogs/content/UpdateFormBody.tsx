import { ChangeEvent, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  updateSettingsForm,
  useSettingsFormSelector,
} from '../../../../../features/settings/settingsFormSlice';
import { useSettingsSelector } from '../../../../../features/settings/settingsSlice';
// context
import { useLanguage } from '../../../../../context/LanguageContext';
// utils
import { removeSpace } from '../../../../../utils/removeSpace';
import { removeExtraSpace } from '../../../../../utils/removeExtraSpace';
// constant
import { loginLength } from '../../../../../constants';

interface UpdateFormBodyProps {
  label: string;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UpdateFormBody({
  label,
  error,
  setError,
  helperText,
  setHelperText,
}: UpdateFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useSettingsSelector((state) => state.settings);

  const { settings } = useSettingsFormSelector((state) => state.settingsForm);

  useEffect(() => {
    if (error) {
      dispatch(updateSettingsForm({ ...settings, username: user.username }));
    }
  }, [error]);

  const handleUserOrPsswdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setHelperText('');
    let userOrPsswd = '';
    if (label === 'password') {
      userOrPsswd = removeExtraSpace(e.target.value);
    } else {
      userOrPsswd = removeSpace(e.target.value);
    }
    dispatch(updateSettingsForm({ ...settings, [e.target.name]: userOrPsswd }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setHelperText('');
    const currentPsswd = removeExtraSpace(e.target.value);
    dispatch(
      updateSettingsForm({ ...settings, [e.target.name]: currentPsswd })
    );
  };

  return (
    <DialogContent>
      <FormControl component="fieldset" error={error}>
        <DialogContentText>
          {label === 'password'
            ? translate('psswdChangeWarning')
            : translate('userChangeWarning')}
        </DialogContentText>

        <Box py={2}>
          <TextField
            autoFocus
            margin="dense"
            name="new_user_or_psswd"
            value={settings.new_user_or_psswd}
            label={
              label === 'password'
                ? `${translate('newPassword')}`
                : `${translate('newUsername')}`
            }
            required
            type={label === 'password' ? 'password' : 'text'}
            fullWidth
            autoComplete="off"
            inputProps={{
              maxLength: loginLength,
            }}
            onChange={handleUserOrPsswdChange}
          />
        </Box>

        <Box py={2}>
          <TextField
            margin="dense"
            label={`${translate('currentPassword')}`}
            required
            name="password"
            value={settings.password}
            type="password"
            autoComplete="new-password"
            inputProps={{
              maxLength: loginLength,
            }}
            fullWidth
            onChange={handlePasswordChange}
          />
        </Box>

        <FormHelperText>
          <Typography>{helperText}</Typography>
        </FormHelperText>
      </FormControl>
    </DialogContent>
  );
}
