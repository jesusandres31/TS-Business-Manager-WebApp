import { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// global state
import { useAppDispatch } from '../../../../app/store';
import { useSettingsSelector } from '../../../../features/settings/settingsSlice';
import {
  updateSettingsForm,
  useSettingsFormSelector,
} from '../../../../features/settings/settingsFormSlice';
// context
import { useLanguage } from '../../../../context/LanguageContext';
// children components
import UpdateFormFooter from './content/UpdateFormFooter';
import UpdateFormBody from './content/UpdateFormBody';

interface UsernameDialogProps {
  open: boolean;
  handleClose: () => void;
  label: string;
}

export default function UsernameDialog({
  open,
  handleClose,
  label,
}: UsernameDialogProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useSettingsSelector((state) => state.settings);

  const { settings } = useSettingsFormSelector((state) => state.settingsForm);

  const [error, setError] = useState(false);

  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    dispatch(updateSettingsForm({ ...settings, username: user.username }));
    setError(false);
    setHelperText('');
  }, [open]);

  return (
    <div>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`${translate(
          'update'
        )} ${translate(label)}`}</DialogTitle>

        <UpdateFormBody
          label={label}
          error={error}
          setError={setError}
          helperText={helperText}
          setHelperText={setHelperText}
        />

        <UpdateFormFooter
          open={open}
          handleClose={handleClose}
          label={label}
          setError={setError}
          setHelperText={setHelperText}
        />
      </Dialog>
    </div>
  );
}
