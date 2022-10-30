import React from 'react';
// components
import { EditButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProvCreateOrUpdateDialog from '../../../../../Dialogs/Providers/ProvCreateOrUpdateDialog';

export default function EditProvButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <EditButton setOpenDialog={setOpenDialog}>
      <ProvCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </EditButton>
  );
}
