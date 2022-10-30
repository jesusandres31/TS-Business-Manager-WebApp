import React from 'react';
// global state
import { useUsersSelector } from '../../../../../../../../features/users/usersSlice';
// hooks
import { useRoles } from '../../../../../../../../hooks/useRoles';
// components
import { DeleteButton } from '../../../../../common/Table/Header/Buttons';
// children components
import UserDeleteOrRecoverDialog from '../../../../../Dialogs/Users/UserDeleteOrRecoverDialog';

interface DeleteUserButtonProps {
  isLastManager: boolean;
}

export default function DeleteUserButton({
  isLastManager,
}: DeleteUserButtonProps) {
  const { user } = useUsersSelector((state) => state.users);

  const [openDialog, setOpenDialog] = React.useState(false);

  const { indexRoleName } = useRoles();

  const message = 'At least one Manager user is needed';

  return user ? (
    isLastManager && indexRoleName(user.role_id) === 'manager' ? (
      <DeleteButton forbidden={true} message={message} />
    ) : (
      <DeleteButton setOpenDialog={setOpenDialog}>
        <UserDeleteOrRecoverDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </DeleteButton>
    )
  ) : null;
}
