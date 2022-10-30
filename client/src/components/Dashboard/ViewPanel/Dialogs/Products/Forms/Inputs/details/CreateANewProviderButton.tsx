import React from 'react';
import { Button, Typography } from '@material-ui/core';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// children components
import ProvCreateOrUpdateDialog from '../../../../../Dialogs/Providers/ProvCreateOrUpdateDialog';

export default function CreateANewProviderButton() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = () => {
    setOpenDialog!(true);
  };

  return (
    <>
      <Button size="small" color="primary" onClick={handleClick}>
        <Typography variant="subtitle2">{`${translate(
          'createANew'
        )} ${translate('provider')}`}</Typography>
      </Button>
      <ProvCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
