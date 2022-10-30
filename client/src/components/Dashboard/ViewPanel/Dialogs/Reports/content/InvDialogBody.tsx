import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiDialogContent from '@material-ui/core/DialogContent';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
import { useInvoicesSelector } from '../../../../../../features/invoices/invoicesSlice';
import {
  fetchInvoiceById,
  updateInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../features/invoices/invoiceFormSlice';
import { useAuthSelector } from '../../../../../../features/auth/authSlice';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
// interface
import {
  ReportMaster,
  ReportDetailForm,
} from '../../../../../../api/invoice.services';
// children components
import HeaderSection from './Body/HeaderSection';
import DetailSection from './Body/DetailSection';
import TableSection from './Body/TableSection';

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //maxHeight: 450,
      minHeight: 430,
      maxWidth: 1000,
      // minWidth: 150,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    content: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    typography: {
      display: 'inline-block',
      paddingLeft: '10px',
    },
  })
);

interface InvDialogBodyProps {
  openDialog: boolean;
}

export default function InvDialogBody({ openDialog }: InvDialogBodyProps) {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { profile } = useProfileSelector((state) => state.profile);

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { authUser } = useAuthSelector((state) => state.auth);

  const [selectedItem, setSelectedItem] = useState<ReportDetailForm | null>(
    null
  );

  const handleFetchInvoiceById = (invoice: ReportMaster) => {
    const invoiceId: number = invoice.id;
    dispatch(fetchInvoiceById(invoiceId))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateInvoiceForm({
            ...invoiceForm,
            id: payload.id,
            client_id: payload.client_id,
            user_id: payload.user_id,
            sale_type_id: payload.sale_type_id,
            payment_type_id: payload.payment_type_id,
            created: payload.created,
            fee_percentageTotal: payload.fee_percentage,
            total: payload.total,
            payment: payload.payment,
            debt: payload.debt,
            old_debt: payload.debt,
            report_details: payload.report_details,
          })
        );
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    let today = new Date();
    dispatch(
      updateInvoiceForm({
        ...invoiceForm,
        user_id: authUser.id!,
        sale_type_id: profile.sale_type_id,
        payment_type_id: profile.payment_type_id,
        created: today,
      })
    );
    if (invoice && openDialog) {
      handleFetchInvoiceById(invoice);
    }
  }, [openDialog]);

  return (
    <DialogContent dividers className={classes.root}>
      <Grid container spacing={0}>
        <HeaderSection classes={classes} />

        <DetailSection
          classes={classes}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />

        <TableSection
          classes={classes}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Grid>
    </DialogContent>
  );
}
