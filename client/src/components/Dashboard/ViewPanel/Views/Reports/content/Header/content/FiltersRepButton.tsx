import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// interface
import { IDate } from '../../../../../../../../interfaces';
// hooks
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';

interface FiltersRepButtonProps {
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  specificDate: Date | null;
  rangedDate: IDate;
}

export default function FiltersRepButton({
  showFilters,
  setShowFilters,
  specificDate,
  rangedDate,
}: FiltersRepButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const handleClick = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Tooltip
      title={showFilters ? translate('goBack') : translate('filterByDate')}
    >
      <IconButton
        aria-label="filters"
        size={isMobile ? 'small' : 'medium'}
        onClick={handleClick}
      >
        {showFilters ? (
          <ArrowBackRoundedIcon />
        ) : specificDate || rangedDate.dateFrom || rangedDate.dateTo ? (
          <EventAvailableRoundedIcon />
        ) : (
          <CalendarTodayRoundedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}
