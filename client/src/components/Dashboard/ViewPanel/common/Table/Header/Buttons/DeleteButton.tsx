import React from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface DeleteButtonProps {
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element;
  forbidden?: boolean;
  message?: string;
}

export default function DeleteButton({
  setOpenDialog,
  children,
  forbidden,
  message,
}: DeleteButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const {
    dispatch: { setSnackbar, resetSnackbar },
  } = useSnackbar();

  const title = translate('delete');

  const handleClick = () => {
    if (forbidden && message) {
      setSnackbar(true, translate(message));
    } else {
      setOpenDialog!(true);
      resetSnackbar();
    }
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          aria-label="delete"
          size={isMobile ? 'small' : 'medium'}
          onClick={handleClick}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {children}
    </>
  );
}
