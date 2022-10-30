import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useClientsSelector } from '../../../../../../../../features/clients/clientsSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// children components
import CliCreateOrUpdateDialog from '../../../../../Dialogs/Clients/CliCreateOrUpdateDialog';

export default function CreateANewClientButton() {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { client } = useClientsSelector((state) => state.clients);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClick = () => {
    setOpenDialog!(true);
  };

  return (
    <>
      <Box px={1}>
        <Tooltip
          title={
            client ? '' : `${translate('createANew')} ${translate('client')}`
          }
          arrow
          placement="bottom-end"
        >
          <span>
            <Button variant="outlined" size="small" onClick={handleClick}>
              <IconButton aria-label="add" size="small">
                <PersonAddRoundedIcon color={client ? 'inherit' : 'primary'} />
              </IconButton>
            </Button>
          </span>
        </Tooltip>
      </Box>
      <CliCreateOrUpdateDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
