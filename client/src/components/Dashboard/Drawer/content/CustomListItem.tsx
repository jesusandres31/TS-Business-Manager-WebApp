import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// components
import StyledListItem from './StyledListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface CustomListItemProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  isSelected: boolean;
}

export default function CustomListItem({
  children,
  onClick,
  isSelected,
}: CustomListItemProps) {
  const classes = useStyles();

  return (
    <StyledListItem
      isSelected={isSelected}
      onClick={onClick}
      newClasses={classes.nested}
    >
      {children}
    </StyledListItem>
  );
}

export {};
