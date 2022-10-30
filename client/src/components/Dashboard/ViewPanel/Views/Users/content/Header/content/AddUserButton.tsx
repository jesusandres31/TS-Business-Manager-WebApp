import React from 'react';
// components
import { AddButton } from '../../../../../common/Table/Header/Buttons';
// children components
import UserCreateOrUpdateDialog from '../../../../../Dialogs/Users/UserCreateOrUpdateDialog';

interface AddUserButtonProps {
  limitOfUsers: boolean;
}

export default function AddUserButton({ limitOfUsers }: AddUserButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const message = 'You have reached the limit of users';

  return limitOfUsers ? (
    <AddButton forbidden={true} message={message} />
  ) : (
    <AddButton setOpenDialog={setOpenDialog}>
      <UserCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AddButton>
  );
}
