import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchUsers,
  useUsersSelector,
  selectUser,
} from '../../../../../../features/users/usersSlice';
import {
  createUser,
  updateUser,
  resetUserForm,
  useUserFormSelector,
} from '../../../../../../features/users/userFormSlice';
// interface
import { User, UserForm } from '../../../../../../api/user.services';
// utils
import { emailVal } from '../../../../../../utils/textFieldVal';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormFooter } from '../../../common/Forms';

interface UserFormFooterProps {
  handleClose: () => void;
  openDialog: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserFormFooter({
  handleClose,
  openDialog,
  setError,
  setHelperText,
}: UserFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { user } = useUsersSelector((state) => state.users);

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (userForm: UserForm) => {
    if (user) {
      if (
        userForm.name.length >= 2 &&
        userForm.surname.length >= 2 &&
        !emailVal(userForm.email)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      if (
        userForm.name.length >= 2 &&
        userForm.surname.length >= 2 &&
        userForm.username.length >= 5 &&
        userForm.password.length >= 5 &&
        !emailVal(userForm.email)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  };

  useEffect(() => {
    validateInput(userForm);
  }, [userForm]);

  const handleSubmit = () => {
    if (user) {
      handleUpdateUser(user, userForm);
    } else {
      handleCreateUser(userForm);
    }
  };

  const handleCreateUser = (userData: UserForm) => {
    const userName: string = userData.name;
    dispatch(createUser(userData))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('user')} "${userName}" ${translate('successCreated')}`
        );
        dispatch(resetUserForm());
        dispatch(fetchUsers());
        dispatch(selectUser(null));
        handleClose();
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  const handleUpdateUser = (selectedUser: User, userData: UserForm) => {
    const userId: number = selectedUser.id;
    const userName: string = userData.name;
    dispatch(updateUser({ userId, userData }))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('user')} "${userName}" ${translate('successUpdated')}`
        );
        dispatch(resetUserForm());
        dispatch(fetchUsers());
        dispatch(selectUser(null));
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  return (
    <FormFooter
      handleSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
      openDialog={openDialog}
      isUpdate={user ? true : false}
    />
  );
}
