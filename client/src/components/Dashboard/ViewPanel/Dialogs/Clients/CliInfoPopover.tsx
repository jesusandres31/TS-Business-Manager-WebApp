import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
// global state
import { useClientsSelector } from '../../../../../features/clients/clientsSlice';
// context
import { useLanguage } from '../../../../../context/LanguageContext';
// components
import {
  InfoPopover,
  StyledTypography,
  CustomListItemAvatar,
} from '../../common/Dialogs';

interface CliInfoPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export default function CliInfoPopover({
  open,
  anchorEl,
  setAnchorEl,
}: CliInfoPopoverProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { client } = useClientsSelector((state) => state.clients);

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (client) {
      setFullName(`${client.name} ${client.surname}`);
    }
  }, [open]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <InfoPopover
      open={open}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      handleClose={handleClose}
    >
      <StyledTypography>{translate('managerName')}</StyledTypography>

      <>
        {client ? (
          client.name.length === 0 && client.surname.length === 0 ? (
            <StyledTypography>{translate('noData')}</StyledTypography>
          ) : (
            <ListItem>
              <CustomListItemAvatar>
                <AccountCircle fontSize="small" />
              </CustomListItemAvatar>
              <ListItemText primary={fullName} />
            </ListItem>
          )
        ) : null}
      </>
    </InfoPopover>
  );
}
