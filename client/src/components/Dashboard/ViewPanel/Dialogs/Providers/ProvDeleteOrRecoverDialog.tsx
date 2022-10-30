import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  fetchProviders,
  useProvidersSelector,
  selectProvider,
} from '../../../../../features/providers/providersSlice';
import {
  disableProvider,
  enableProvider,
} from '../../../../../features/providers/providerFormSlice';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useIsRecycleBin } from '../../common/hooks/useIsRecycleBin';
// components
import { DeleteOrRecoverDialog } from '../../common/Dialogs';

interface ProvDeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProvDeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
}: ProvDeleteOrRecoverDialogProps) {
  const dispatch = useAppDispatch();

  const { isRecycleBin } = useIsRecycleBin();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { provider } = useProvidersSelector((state) => state.providers);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (isRecycleBin) {
      setConfirMessage(translate('recoverProv'));
      setAlertMessage(translate(''));
    } else {
      setConfirMessage(translate('deleteProv'));
      setAlertMessage(translate('youCanRecoverFromBin'));
    }
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleDisableProvider = async (
    providerId: number,
    providerName: string
  ) => {
    dispatch(disableProvider(providerId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('provider')} "${providerName}" ${translate(
            'successDisabled'
          )}`
        );
        dispatch(fetchProviders());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleEnableProvider = async (
    providerId: number,
    providerName: string
  ) => {
    dispatch(enableProvider(providerId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('provider')} "${providerName}" ${translate(
            'successEnabled'
          )}`
        );
        dispatch(fetchProviders());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleSubmit = () => {
    if (provider) {
      resetSnackbar();
      const providerId: number = provider.id;
      const providerName: string = provider.company_name;
      if (isRecycleBin) {
        handleEnableProvider(providerId, providerName);
      } else {
        handleDisableProvider(providerId, providerName);
      }
      setOpenDialog(false);
      dispatch(selectProvider(null));
    }
  };

  return (
    <DeleteOrRecoverDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      handleSubmit={handleSubmit}
      confirMessage={confirMessage}
      alertMessage={alertMessage}
    />
  );
}
