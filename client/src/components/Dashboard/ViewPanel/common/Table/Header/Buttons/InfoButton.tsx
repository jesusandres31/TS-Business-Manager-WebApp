import React from 'react';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';

interface InfoProdButtonProps {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  children: JSX.Element;
}

export default function InfoProdButton({
  setAnchorEl,
  children,
}: InfoProdButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const title = translate('info');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title={title}>
        <IconButton
          aria-label="info"
          size={isMobile ? 'small' : 'medium'}
          onClick={handleClick}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      {children}
    </>
  );
}
