import { ChangeEvent } from 'react';
// mui
import { MenuItem } from '@material-ui/core';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import { useUsersSelector } from '../../../../../../../features/users/usersSlice';
import {
  updateUserForm,
  useUserFormSelector,
} from '../../../../../../../features/users/userFormSlice';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// hooks
import { useRoles } from '../../../../../../../hooks/useRoles';
import { useIsLastManager } from '../../../../common/hooks/useIsLastManager';
// components
import { InputField } from '../../../../common/Forms/Inputs';

export default function RoleInput() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useUsersSelector((state) => state.users);

  const { userForm } = useUserFormSelector((state) => state.userForm);

  const label = translate('role');

  const { usableRoles, indexRoleName } = useRoles();

  const { isLastManager } = useIsLastManager();

  const roles = usableRoles();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateUserForm({
        ...userForm,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <InputField
      id="role-id"
      name="role_id"
      disabled={
        user
          ? isLastManager && indexRoleName(user.role_id) === 'manager'
          : false
      }
      select
      label={label}
      required
      value={userForm.role_id}
      onChange={handleInputChange}
    >
      {roles.map((role) => (
        <MenuItem key={role.id} value={role.id}>
          {translate(role.name)}
        </MenuItem>
      ))}
    </InputField>
  );
}
