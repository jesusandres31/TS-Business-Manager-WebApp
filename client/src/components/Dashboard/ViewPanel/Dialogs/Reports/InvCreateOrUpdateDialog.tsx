import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  resetInvoiceForm,
  useInvoiceFormSelector,
  updateInvoiceForm,
} from '../../../../../features/invoices/invoiceFormSlice';
import { resetInvoiceDetailForm } from '../../../../../features/invoices/invoiceDetailFormSlice';
import { fetchProducts } from '../../../../../features/products/productsSlice';
// children components
import InvDialogBody from './content/InvDialogBody';
import InvDialogFooter from './content/InvDialogFooter';
import InvDialogHeader from './content/InvDialogHeader';

interface InvoicingDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InvoicingDialog({
  openDialog,
  setOpenDialog,
}: InvoicingDialogProps) {
  const dispatch = useAppDispatch();

  const { invoiceForm, loading } = useInvoiceFormSelector(
    (state) => state.invoiceForm
  );

  const [pinDialog, setPinDialog] = useState(false);

  useEffect(() => {
    let today = new Date();
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        created: today,
      })
    );
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    dispatch(resetInvoiceDetailForm());
    dispatch(resetInvoiceForm());
    dispatch(fetchProducts());
  };

  return (
    <>
      <Dialog
        open={openDialog}
        keepMounted
        maxWidth="lg"
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="simple-dialog"
      >
        <InvDialogHeader
          handleClose={handleClose}
          pinDialog={pinDialog}
          setPinDialog={setPinDialog}
        />

        {loading ? <LinearProgress color="secondary" /> : null}

        <InvDialogBody openDialog={openDialog} />

        <InvDialogFooter
          handleClose={handleClose}
          openDialog={openDialog}
          pinDialog={pinDialog}
        />
      </Dialog>
    </>
  );
}
