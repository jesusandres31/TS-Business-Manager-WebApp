import React, { useState } from 'react';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  resetProviderForm,
  useProviderFormSelector,
} from '../../../../../features/providers/providerFormSlice';
import ProvFormBody from './Forms/ProvFormBody';
import ProvFormFooter from './Forms/ProvFormFooter';
import ProvFormHeader from './Forms/ProvFormHeader';
// components
import { CreateOrUpdateDialog } from '../../common/Dialogs';

interface ProvCreateOrUpdateDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProvCreateOrUpdateDialog({
  openDialog,
  setOpenDialog,
}: ProvCreateOrUpdateDialogProps) {
  const dispatch = useAppDispatch();

  const { loading } = useProviderFormSelector((state) => state.providerForm);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleClose = () => {
    dispatch(resetProviderForm());
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
        <ProvFormHeader handleClose={handleClose} />
        <ProvFormBody
          openDialog={openDialog}
          error={error}
          setError={setError}
          helperText={helperText}
          setHelperText={setHelperText}
        />
        <ProvFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
          setError={setError}
          setHelperText={setHelperText}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
