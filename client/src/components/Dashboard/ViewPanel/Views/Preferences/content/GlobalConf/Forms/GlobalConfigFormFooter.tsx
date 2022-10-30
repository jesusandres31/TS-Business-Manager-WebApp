import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchProfile } from '../../../../../../../../features/profile/profileSlice';
import {
  useProfileFormSelector,
  updateGlobalConfig,
} from '../../../../../../../../features/profile/profileFormSlice';
// interface
import { GlobalConfig } from '../../../../../../../../api/profile.services';
// context
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { FormFooter } from '../../../../../common/Forms';

interface GlobalConfigFormFooterProps {
  handleClose: () => void;
  openDialog: boolean;
}

export default function GlobalConfigFormFooter({
  handleClose,
  openDialog,
}: GlobalConfigFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { setLanguage },
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { globalConfig } = useProfileFormSelector((state) => state.profileForm);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (globalConfig: GlobalConfig) => {
    if (globalConfig.company_name.length >= 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInput(globalConfig);
  }, [globalConfig]);

  const handleSubmit = () => {
    handleUpdateGlobalConfig(globalConfig);
  };

  const handleUpdateGlobalConfig = (globalConfig: GlobalConfig) => {
    dispatch(updateGlobalConfig(globalConfig))
      .then(unwrapResult)
      .then(() => {
        setLanguage(globalConfig.language);
        setSnackbar(
          true,
          `${translate('profile')} ${translate('successUpdated')}`
        );
        dispatch(fetchProfile());
        handleClose();
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  return (
    <FormFooter
      handleSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
      openDialog={openDialog}
      isUpdate={true}
    />
  );
}
