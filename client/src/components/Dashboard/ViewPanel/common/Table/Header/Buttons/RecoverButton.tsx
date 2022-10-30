import React from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface RecoverButtonProps {
  setOpenDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: JSX.Element;
  forbidden?: boolean;
  message?: string;
}

export default function RecoverButton({
  setOpenDialog,
  children,
  forbidden,
  message,
}: RecoverButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const {
    dispatch: { setSnackbar, resetSnackbar },
  } = useSnackbar();

  const title = translate('recover');

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
          aria-label="recover"
          size={isMobile ? 'small' : 'medium'}
          onClick={handleClick}
        >
          <SettingsBackupRestoreIcon />
        </IconButton>
      </Tooltip>

      {children}
    </>
  );
}
