import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../app/store';
import {
  fetchUsers,
  useUsersSelector,
  selectUser,
} from '../../../../../features/users/usersSlice';
import {
  disableUser,
  enableUser,
} from '../../../../../features/users/userFormSlice';
// context
import { useSnackbar } from '../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useIsRecycleBin } from '../../common/hooks/useIsRecycleBin';
// components
import { DeleteOrRecoverDialog } from '../../common/Dialogs';

interface UserDeleteOrRecoverDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserDeleteOrRecoverDialog({
  openDialog,
  setOpenDialog,
}: UserDeleteOrRecoverDialogProps) {
  const dispatch = useAppDispatch();

  const { isRecycleBin } = useIsRecycleBin();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useUsersSelector((state) => state.users);

  const [confirMessage, setConfirMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (isRecycleBin) {
      setConfirMessage(translate('recoverUser'));
      setAlertMessage(translate('willBeAbleToEnterTheSystem'));
    } else {
      setConfirMessage(translate('deleteUser'));
      setAlertMessage(translate('willNoEnterTheApp'));
    }
  }, [openDialog]);

  const {
    dispatch: { setSnackbar, resetSnackbar, errorSnackbar },
  } = useSnackbar();

  const handleDisableUser = async (
    userId: number,
    userName: string,
    userSurame: string
  ) => {
    dispatch(disableUser(userId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('user')} "${userName} ${userSurame}" ${translate(
            'successDisabled'
          )}`
        );
        dispatch(fetchUsers());
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleEnableUser = async (
    userId: number,
    userName: string,
    userSurame: string
  ) => {
    dispatch(enableUser(userId))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('user')} "${userName} ${userSurame}" ${translate(
            'successEnabled'
          )}`
        );
        dispatch(fetchUsers());
      })
      .catch((err) => {
        setSnackbar(true, translate(err.message as string));
        throw err;
      });
  };

  const handleSubmit = () => {
    if (user) {
      const userId: number = user.id;
      const userName: string = user.name;
      const userSurame: string = user.surname;
      resetSnackbar();
      if (isRecycleBin) {
        handleEnableUser(userId, userName, userSurame);
      } else {
        handleDisableUser(userId, userName, userSurame);
      }
      setOpenDialog(false);
      dispatch(selectUser(null));
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
