import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchProfile } from '../../../../../../../../features/profile/profileSlice';
import {
  useProfileFormSelector,
  updateValueConfig,
} from '../../../../../../../../features/profile/profileFormSlice';
// interface
import { ValueConfig } from '../../../../../../../../api/profile.services';
// context
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { FormFooter } from '../../../../../common/Forms';

interface ValueConfigFooterProps {
  handleClose: () => void;
  openDialog: boolean;
}

export default function ValueConfigFooter({
  handleClose,
  openDialog,
}: ValueConfigFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { valueConfig } = useProfileFormSelector((state) => state.profileForm);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(false);
  }, [valueConfig]);

  const handleSubmit = () => {
    handleUpdateValueConfig(valueConfig);
  };

  const handleUpdateValueConfig = (valueConfig: ValueConfig) => {
    dispatch(updateValueConfig(valueConfig))
      .then(unwrapResult)
      .then(() => {
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
