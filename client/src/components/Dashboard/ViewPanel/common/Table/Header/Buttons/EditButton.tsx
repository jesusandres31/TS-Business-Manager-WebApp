import React from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface EditButtonProps {
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element;
}

export default function EditButton({
  setOpenDialog,
  children,
}: EditButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const title = translate('edit');

  const {
    dispatch: { resetSnackbar },
  } = useSnackbar();

  const handleClick = () => {
    setOpenDialog(true);
    resetSnackbar();
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          aria-label="edit"
          size={isMobile ? 'small' : 'medium'}
          onClick={handleClick}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      {children}
    </>
  );
}
