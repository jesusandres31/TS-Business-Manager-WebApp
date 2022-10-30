import React from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface AddButtonProps {
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element;
  forbidden?: boolean;
  message?: string;
}

export default function AddButton({
  setOpenDialog,
  children,
  forbidden,
  message,
}: AddButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const {
    dispatch: { setSnackbar, resetSnackbar },
  } = useSnackbar();

  const title = translate('add');

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
          aria-label="add"
          size={isMobile ? 'small' : 'medium'}
          onClick={handleClick}
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>

      {children}
    </>
  );
}
