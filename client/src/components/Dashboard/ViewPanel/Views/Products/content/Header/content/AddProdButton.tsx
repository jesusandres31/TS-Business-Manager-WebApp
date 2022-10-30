import React from 'react';
// components
import { AddButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProdCreateOrUpdateDialog from '../../../../../Dialogs/Products/ProdCreateOrUpdateDialog';

export default function AddProdButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <AddButton setOpenDialog={setOpenDialog}>
      <ProdCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </AddButton>
  );
}
