import React from 'react';
// components
import { DeleteButton } from '../../../../../common/Table/Header/Buttons';
// children components
import ProdDeleteOrRecoverDialog from '../../../../../Dialogs/Products/ProdDeleteOrRecoverDialog';

export default function DeleteProdButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <DeleteButton setOpenDialog={setOpenDialog}>
      <ProdDeleteOrRecoverDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </DeleteButton>
  );
}
