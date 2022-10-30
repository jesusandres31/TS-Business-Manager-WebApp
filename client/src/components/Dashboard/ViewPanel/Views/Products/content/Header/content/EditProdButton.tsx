import React from 'react';
// components
import { EditButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProdCreateOrUpdateDialog from '../../../../../Dialogs/Products/ProdCreateOrUpdateDialog';

export default function EditProdButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <EditButton setOpenDialog={setOpenDialog}>
      <ProdCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </EditButton>
  );
}
