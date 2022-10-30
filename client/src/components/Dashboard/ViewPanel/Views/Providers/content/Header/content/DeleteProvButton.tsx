import React from 'react';
// components
import { DeleteButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProvDeleteOrRecoverDialog from '../../../../../Dialogs/Providers/ProvDeleteOrRecoverDialog';

export default function DeleteProvButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <DeleteButton setOpenDialog={setOpenDialog}>
      <ProvDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </DeleteButton>
  );
}
