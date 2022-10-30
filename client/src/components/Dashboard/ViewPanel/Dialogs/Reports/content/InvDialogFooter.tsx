import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// components
import { DialogActions } from '../../../common/Forms/FormFooter';
// child componentes
import TotalText from './Footer/TotalText';
import DebtText from './Footer/DebtText';
import FeePercentageTotalInput from './Footer/FeePercentageTotalInput';
import PaymentInput from './Footer/PaymentInput';
import ConfirmButton from './Footer/ConfirmButton';

interface InvDialogFooterProps {
  handleClose: () => void;
  openDialog: boolean;
  pinDialog: boolean;
}

export default function InvDialogFooter({
  handleClose,
  openDialog,
  pinDialog,
}: InvDialogFooterProps) {
  return (
    <DialogActions>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Box pl={3} display="flex" justifyContent="flex-start">
            <FeePercentageTotalInput />
          </Box>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Box display="flex" justifyContent="flex-start">
            <TotalText />
          </Box>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Box display="flex" justifyContent="flex-start">
            <PaymentInput />
          </Box>
        </Grid>

        <Grid item xs={12} sm={2}>
          <Box display="flex" justifyContent="flex-start">
            <DebtText />
          </Box>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box mt={0.5} display="flex" justifyContent="flex-end">
            <ConfirmButton
              handleClose={handleClose}
              openDialog={openDialog}
              pinDialog={pinDialog}
            />
          </Box>
        </Grid>
      </Grid>
    </DialogActions>
  );
}
