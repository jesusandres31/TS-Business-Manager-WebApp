import React, { useState } from 'react';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  resetClientForm,
  useClientFormSelector,
} from '../../../../../features/clients/clientFormSlice';
// children components
import CliFormBody from './Forms/CliFormBody';
import CliFormFooter from './Forms/CliFormFooter';
import CliFormHeader from './Forms/CliFormHeader';
// components
import { CreateOrUpdateDialog } from '../../common/Dialogs';

interface CliCreateOrUpdateDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CliCreateOrUpdateDialog({
  openDialog,
  setOpenDialog,
}: CliCreateOrUpdateDialogProps) {
  const dispatch = useAppDispatch();

  const { loading } = useClientFormSelector((state) => state.clientForm);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleClose = () => {
    dispatch(resetClientForm());
    setError(false);
    setHelperText('');
    setOpenDialog(false);
  };

  return (
    <>
      <CreateOrUpdateDialog
        openDialog={openDialog}
        handleClose={handleClose}
        loading={loading}
      >
        <CliFormHeader handleClose={handleClose} />
        <CliFormBody
          openDialog={openDialog}
          error={error}
          setError={setError}
          helperText={helperText}
          setHelperText={setHelperText}
        />
        <CliFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
          setError={setError}
          setHelperText={setHelperText}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
