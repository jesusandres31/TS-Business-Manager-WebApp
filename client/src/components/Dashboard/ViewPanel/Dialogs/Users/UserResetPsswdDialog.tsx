import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  fetchUsers,
  useUsersSelector,
  selectUser,
} from '../../../../../features/users/usersSlice';
import { resetUserPsswd } from '../../../../../features/users/userFormSlice';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// components
import { AlertDialog } from '../../common/Dialogs';

interface UserResetPsswdDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserResetPsswdDialog({
  openDialog,
  setOpenDialog,
}: UserResetPsswdDialogProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useUsersSelector((state) => state.users);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setConfirMessage(translate('resetPassword?'));
    setAlertMessage(translate(''));
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleResetPassword = async (
    userId: number,
    userName: string,
    userSurame: string
  ) => {
    dispatch(resetUserPsswd(userId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('psswdSuccessReseted')}. ${translate(
            'user'
          )} "${userName} ${userSurame}"`
        );
        dispatch(fetchUsers());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleSubmit = () => {
    if (user) {
      const userId: number = user.id;
      const userName: string = user.name;
      const userSurame: string = user.surname;
      resetSnackbar();
      handleResetPassword(userId, userName, userSurame);
      setOpenDialog(false);
      dispatch(selectUser(null));
    }
  };

  return (
    <AlertDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      handleSubmit={handleSubmit}
      confirMessage={confirMessage}
      alertMessage={alertMessage}
    />
  );
}
