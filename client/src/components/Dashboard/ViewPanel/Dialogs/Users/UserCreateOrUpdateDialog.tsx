import React, { useState } from 'react';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  resetUserForm,
  useUserFormSelector,
} from '../../../../../features/users/userFormSlice';
// children components
import UserFormBody from './Forms/UserFormBody';
import UserFormFooter from './Forms/UserFormFooter';
import UserFormHeader from './Forms/UserFormHeader';
// components
import { CreateOrUpdateDialog } from '../../common/Dialogs';

interface UserCreateOrUpdateDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserCreateOrUpdateDialog({
  openDialog,
  setOpenDialog,
}: UserCreateOrUpdateDialogProps) {
  const dispatch = useAppDispatch();

  const { loading } = useUserFormSelector((state) => state.userForm);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleClose = () => {
    dispatch(resetUserForm());
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
        <UserFormHeader handleClose={handleClose} />
        <UserFormBody
          openDialog={openDialog}
          error={error}
          setError={setError}
          helperText={helperText}
          setHelperText={setHelperText}
        />
        <UserFormFooter
          handleClose={handleClose}
          openDialog={openDialog}
          setError={setError}
          setHelperText={setHelperText}
        />
      </CreateOrUpdateDialog>
    </>
  );
}
