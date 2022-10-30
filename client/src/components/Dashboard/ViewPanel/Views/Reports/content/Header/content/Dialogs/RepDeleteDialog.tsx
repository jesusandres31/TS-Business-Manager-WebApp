import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  fetchInvoices,
  useInvoicesSelector,
  selectInvoice,
} from '../../../../../../../../../features/invoices/invoicesSlice';
import { deleteInvoice } from '../../../../../../../../../features/invoices/invoiceFormSlice';
// context
import { useSnackbar } from '../../../../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import { DeleteOrRecoverDialog } from '../../../../../../common/Dialogs';

interface RepDeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RepDeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
}: RepDeleteOrRecoverDialogProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setConfirMessage(translate('deleteInvoice'));
    setAlertMessage(translate('youWillNoLongerBeAbleToRecoverIt'));
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleDeleteInvoice = async (invoiceId: number) => {
    dispatch(deleteInvoice(invoiceId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('report')} ${invoiceId} ${translate('successDeleted')}`
        );
        dispatch(fetchInvoices());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleSubmit = () => {
    if (invoice) {
      resetSnackbar();
      const invoiceId: number = invoice.id;
      handleDeleteInvoice(invoiceId);
      setOpenDialog(false);
      dispatch(selectInvoice(null));
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
