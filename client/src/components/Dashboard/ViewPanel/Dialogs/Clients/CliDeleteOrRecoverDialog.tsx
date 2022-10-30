import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  fetchClients,
  useClientsSelector,
  selectClient,
} from '../../../../../features/clients/clientsSlice';
import {
  disableClient,
  enableClient,
} from '../../../../../features/clients/clientFormSlice';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useIsRecycleBin } from '../../common/hooks/useIsRecycleBin';
// components
import { DeleteOrRecoverDialog } from '../../common/Dialogs';

interface CliDeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CliDeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
}: CliDeleteOrRecoverDialogProps) {
  const dispatch = useAppDispatch();

  const { isRecycleBin } = useIsRecycleBin();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { client } = useClientsSelector((state) => state.clients);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (isRecycleBin) {
      setConfirMessage(translate('recoverCli'));
      setAlertMessage(translate(''));
    } else {
      setConfirMessage(translate('deleteCli'));
      setAlertMessage(translate('youCanRecoverFromBin'));
    }
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleDisableClient = async (clientId: number, clientName: string) => {
    dispatch(disableClient(clientId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('client')} "${clientName}" ${translate(
            'successDisabled'
          )}`
        );
        dispatch(fetchClients());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleEnableClient = async (clientId: number, clientName: string) => {
    dispatch(enableClient(clientId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('client')} "${clientName}" ${translate(
            'successEnabled'
          )}`
        );
        dispatch(fetchClients());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleSubmit = () => {
    if (client) {
      resetSnackbar();
      const clientId: number = client.id;
      const clientName: string = client.company_name;
      if (isRecycleBin) {
        handleEnableClient(clientId, clientName);
      } else {
        handleDisableClient(clientId, clientName);
      }
      setOpenDialog(false);
      dispatch(selectClient(null));
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
