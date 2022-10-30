import React from 'react';
// components
import { EditButton } from '../../../../../common/Table/Header/Buttons';
// children components
import CliCreateOrUpdateDialog from '../../../../../Dialogs/Clients/CliCreateOrUpdateDialog';

export default function EditCliButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <EditButton setOpenDialog={setOpenDialog}>
      <CliCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </EditButton>
  );
}
