import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
// global state
import { useProvidersSelector } from '../../../../../features/providers/providersSlice';
// context
import { useLanguage } from '../../../../../context/LanguageContext';
// components
import {
  InfoPopover,
  StyledTypography,
  CustomListItemAvatar,
} from '../../common/Dialogs';

interface ProvInfoPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export default function ProvInfoPopover({
  open,
  anchorEl,
  setAnchorEl,
}: ProvInfoPopoverProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { provider } = useProvidersSelector((state) => state.providers);

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (provider) {
      setFullName(`${provider.name} ${provider.surname}`);
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
        {provider ? (
          provider.name.length === 0 && provider.surname.length === 0 ? (
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
