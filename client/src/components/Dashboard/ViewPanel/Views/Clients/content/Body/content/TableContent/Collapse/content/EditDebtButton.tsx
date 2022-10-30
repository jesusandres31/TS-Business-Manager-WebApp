import React from 'react';
import Button from '@material-ui/core/Button';
// interface
import { Client } from '../../../../../../../../../../../api/client.services';
// context
import { useLanguage } from '../../../../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../../../../context/SnackbarContext';
// child components
import EditDebtDialog from './Dialog/EditDebtDialog';

interface EditDebtButtonProps {
  loadCheckingAccount: (client: Client, page: number) => void;
  row: Client;
  page: number;
}

export default function EditDebtButton({
  loadCheckingAccount,
  row,
  page,
}: EditDebtButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { resetSnackbar },
  } = useSnackbar();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = () => {
    setOpenDialog!(true);
    resetSnackbar();
  };

  return (
    <>
      <Button color="primary" onClick={handleClick}>
        {`${translate('update')} ${translate('debt')}`}
      </Button>
      {openDialog ? (
        <EditDebtDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          loadCheckingAccount={loadCheckingAccount}
          row={row}
          page={page}
        />
      ) : null}
    </>
  );
}
