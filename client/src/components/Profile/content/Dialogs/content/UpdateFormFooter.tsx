import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useAppDispatch } from '../../../../../app/store';
import { fetchMyUser } from '../../../../../features/settings/settingsSlice';
import {
  changePsswd,
  changeUsername,
  useSettingsFormSelector,
} from '../../../../../features/settings/settingsFormSlice';
import { signOut } from '../../../../../features/auth/authSlice';
// interface
import { SettingsForm } from '../../../../../api/setting.services';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';

interface UpdateFormFooterProps {
  open: boolean;
  handleClose: () => void;
  label: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UpdateFormFooter({
  open,
  handleClose,
  label,
  setError,
  setHelperText,
}: UpdateFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar },
  } = useSnackbar();

  const { settings } = useSettingsFormSelector((state) => state.settingsForm);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (settings: SettingsForm) => {
    if (
      settings.new_user_or_psswd.length >= 5 &&
      settings.password.length >= 5
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInput(settings);
  }, [settings]);

  const handleUpdatePsswd = (settingData: SettingsForm) => {
    dispatch(changePsswd(settingData))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(true, `${translate('psswdSuccessUpdated')}`);
        dispatch(fetchMyUser());
        setTimeout(() => {
          dispatch(signOut());
        }, 3000);
        handleClose();
      })
      .catch((err) => {
        setHelperText(`❌ ${translate(err.message)}`);
        setError(true);
        throw err;
      });
  };

  const handleUpdateUser = (settingData: SettingsForm) => {
    dispatch(changeUsername(settingData))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(true, `${translate('userSuccessUpdated')}`);
        dispatch(fetchMyUser());
        setTimeout(() => {
          dispatch(signOut());
        }, 3000);
        handleClose();
      })
      .catch((err) => {
        setHelperText(`❌ ${translate(err.message)}`);
        setError(true);
        throw err;
      });
  };

  const handleSubmit = () => {
    if (label === 'password') {
      handleUpdatePsswd(settings);
    } else {
      handleUpdateUser(settings);
    }
  };

  return (
    <DialogActions>
      <Button onClick={handleClose} color="primary" style={{ fontWeight: 600 }}>
        {translate('cancel')}
      </Button>
      <Tooltip
        title={buttonDisabled && open ? translate('completeTheFields') : ''}
        arrow
        placement="left-end"
      >
        <span>
          <Button
            onClick={handleSubmit}
            disabled={buttonDisabled}
            color="primary"
            style={{ fontWeight: 600 }}
          >
            {translate('confirm')}
          </Button>
        </span>
      </Tooltip>
    </DialogActions>
  );
}
