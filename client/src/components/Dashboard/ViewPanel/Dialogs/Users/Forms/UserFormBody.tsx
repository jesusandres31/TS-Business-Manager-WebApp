import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
import { useUsersSelector } from '../../../../../../features/users/usersSlice';
import {
  fetchUserById,
  updateUserForm,
  useUserFormSelector,
} from '../../../../../../features/users/userFormSlice';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
// interface
import { User } from '../../../../../../api/user.services';
// hooks
import { useRoles } from '../../../../../../hooks/useRoles';
// components
import { FormBody, StyledGrid } from '../../../common/Forms';
// children components
import NameInput from './Inputs/NameInput';
import SurnameInput from './Inputs/SurnameInput';
import RoleInput from './Inputs/RoleInput';
import EmailInput from './Inputs/EmailInput';
import PhoneInput from './Inputs/PhoneInput';
import LocalityInput from './Inputs/LocalityInput';
import UsernameInput from './Inputs/UsernameInput';
import PasswordInput from './Inputs/PasswordInput';
import RoleTag from './Inputs/RoleTag';

interface UserFormBodyProps {
  openDialog: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserFormBody({
  openDialog,
  error,
  setError,
  helperText,
  setHelperText,
}: UserFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { profile } = useProfileSelector((state) => state.profile);

  const { user } = useUsersSelector((state) => state.users);

  const { userForm } = useUserFormSelector((state) => state.userForm);

  // role_id state
  const { usableRoles } = useRoles();
  const roles = usableRoles();
  const roleAdmin = roles.find((role) => role.name === 'admin');

  const handleFetchUserById = (user: User) => {
    const userId: number = user.id;
    dispatch(fetchUserById(userId))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateUserForm({
            ...user,
            name: payload.name,
            surname: payload.surname,
            locality: payload.locality,
            role_id: payload.role_id,
            email: payload.email,
            phone: payload.phone,
          })
        );
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    if (user && openDialog) {
      handleFetchUserById(user);
    }
    if (!user && openDialog && roleAdmin) {
      dispatch(
        updateUserForm({
          ...userForm,
          locality: profile.locality,
          role_id: roleAdmin.id,
        })
      );
    }
  }, [openDialog]);

  return (
    <FormBody>
      <>
        <StyledGrid item xs={12} sm={6}>
          <NameInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <SurnameInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <PhoneInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <EmailInput
            error={error}
            setError={setError}
            helperText={helperText}
            setHelperText={setHelperText}
          />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <LocalityInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <RoleInput />
        </StyledGrid>

        {user ? (
          <></>
        ) : (
          <>
            <StyledGrid item xs={12} sm={6}>
              <UsernameInput
                error={error}
                setError={setError}
                helperText={helperText}
                setHelperText={setHelperText}
              />
            </StyledGrid>

            <StyledGrid item xs={12} sm={6}>
              <PasswordInput />
            </StyledGrid>
          </>
        )}

        <StyledGrid item>
          <RoleTag />
        </StyledGrid>
      </>
    </FormBody>
  );
}
