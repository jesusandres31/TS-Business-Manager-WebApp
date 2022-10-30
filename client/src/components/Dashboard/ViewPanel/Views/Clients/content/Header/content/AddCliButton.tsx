import React from 'react';
// components
import { AddButton } from '../../../../../common/Table/Header/Buttons';
// children components
import CliCreateOrUpdateDialog from '../../../../../Dialogs/Clients/CliCreateOrUpdateDialog';

export default function AddCliButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <AddButton setOpenDialog={setOpenDialog}>
      <CliCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AddButton>
  );
}
