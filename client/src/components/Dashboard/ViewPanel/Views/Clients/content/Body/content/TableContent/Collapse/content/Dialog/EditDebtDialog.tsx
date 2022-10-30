import React, { useState, ChangeEvent } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
// global state
import { useAppDispatch } from '../../../../../../../../../../../../app/store';
import { updateClientDebt } from '../../../../../../../../../../../../features/clients/clientFormSlice';
import { fetchClients } from '../../../../../../../../../../../../features/clients/clientsSlice';
// interface
import {
  Client,
  UpdateClientDebtForm,
} from '../../../../../../../../../../../../api/client.services';
// common
import { NumberFormat2ZerosNeg } from '../../../../../../../../../../../../common/NumberFormatCustom';
// utils
import { formatDate } from '../../../../../../../../../../../../utils/formatDate';
// context
import { useLanguage } from '../../../../../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../../../../../context/SnackbarContext';

interface EditDebtDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loadCheckingAccount: (client: Client, page: number) => void;
  row: Client;
  page: number;
}

export default function EditDebtDialog({
  openDialog,
  setOpenDialog,
  loadCheckingAccount,
  row,
  page,
}: EditDebtDialogProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const [clientDebtForm, setClientDebtForm] = useState<UpdateClientDebtForm>({
    client_id: row.id,
    updated_debt: row.debt,
    created: formatDate(new Date()),
    previous_debt: row.debt,
    movement: 0,
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = async () => {
    let movementValue = parseFloat(clientDebtForm.movement as string);
    if (clientDebtForm.movement !== '' && movementValue !== 0) {
      // inverting movement value for storing in database
      let invertedValue = 0;
      let valueNum = movementValue;
      if (valueNum < 0) {
        invertedValue = Math.abs(valueNum);
      } else {
        invertedValue = -Math.abs(valueNum);
      }
      // updating
      dispatch(
        updateClientDebt({
          client_id: clientDebtForm.client_id,
          updated_debt: clientDebtForm.updated_debt,
          created: clientDebtForm.created,
          previous_debt: clientDebtForm.previous_debt,
          movement: invertedValue,
        })
      )
        .then(unwrapResult)
        .then(() => {
          setSnackbar(
            true,
            `${translate('debt')} ${translate('successUpdated')}`
          );
          loadCheckingAccount(row, page);
          dispatch(fetchClients());
          handleClose();
        })
        .catch((err) => {
          errorSnackbar();
          throw err;
        });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || e.target.value === '-') {
      setClientDebtForm({
        ...clientDebtForm,
        movement: '',
        updated_debt: clientDebtForm.previous_debt,
      });
    } else {
      let newPayment = e.target.value as string;
      let newDebt = (
        parseFloat(clientDebtForm.previous_debt as string) -
        parseFloat(newPayment)
      ).toFixed(2);
      // updating
      setClientDebtForm({
        ...clientDebtForm,
        movement: newPayment,
        updated_debt: newDebt,
      });
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="debt-dialog"
    >
      <DialogTitle id="debt-dialog-title">
        {`${translate('updateDebtOfClient')} ${row.company_name} 💰`}
      </DialogTitle>
      <DialogContent>
        <Box p={2} pt={3} display="flex" justifyContent="center">
          <DialogContentText>
            <Typography variant="subtitle1">{`${translate(
              'debt'
            )}:`}</Typography>
            <Typography variant="h3">{`$ ${clientDebtForm.updated_debt}`}</Typography>
          </DialogContentText>
        </Box>

        <Box p={2} display="flex" justifyContent="center">
          <TextField
            autoFocus
            margin="dense"
            id="payment"
            name="payment"
            autoComplete="off"
            label={translate('payment')}
            value={clientDebtForm.movement}
            onChange={handleInputChange}
            InputProps={{
              inputComponent: NumberFormat2ZerosNeg as any,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 13,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {translate('cancel')}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {translate('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
