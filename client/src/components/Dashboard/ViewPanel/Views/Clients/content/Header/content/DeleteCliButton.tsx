import React from 'react';
// components
import { DeleteButton } from '../../../../../common/Table/Header/Buttons';
// children components
import CliDeleteOrRecoverDialog from '../../../../../Dialogs/Clients/CliDeleteOrRecoverDialog';

export default function DeleteCliButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <DeleteButton setOpenDialog={setOpenDialog}>
      <CliDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </DeleteButton>
  );
}
