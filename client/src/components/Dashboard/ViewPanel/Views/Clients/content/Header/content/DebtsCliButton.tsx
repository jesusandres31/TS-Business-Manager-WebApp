import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';
import { useComeBackToFirstPage } from '../../../../../common/hooks/useComeBackToFirstPage';

interface DebtsRepButtonProps {
  showCliWithDebts: boolean;
  setShowCliWithDebts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DebtsRepButton({
  showCliWithDebts,
  setShowCliWithDebts,
}: DebtsRepButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { comeBackToFirstPage } = useComeBackToFirstPage();

  const { isMobile } = useIsMobile();

  const handleClick = () => {
    setShowCliWithDebts(!showCliWithDebts);
    comeBackToFirstPage();
  };

  return (
    <Tooltip title={translate('showCliWithDebts')}>
      <IconButton
        aria-label="filters"
        size={isMobile ? 'small' : 'medium'}
        onClick={handleClick}
      >
        {showCliWithDebts ? (
          <CheckBoxRoundedIcon />
        ) : (
          <CheckBoxOutlineBlankRoundedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
