import React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  lighten,
  darken,
} from '@material-ui/core/styles';
import MuiListItem from '@material-ui/core/ListItem';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.background.paper,
      },
      '&:hover': {
        borderRadius: 4,
      },
      /* '&:hover': {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 3,
      },
      '&.Mui-selected': {
         backgroundColor: theme.palette.action.selected,
      },
      '&.Mui-selected:hover': {
        backgroundColor: 'purple',
        color: 'white',
      }, */
      /* '&.Mui-selected':
        theme.palette.type === 'light'
          ? {
              backgroundColor: lighten(theme.palette.primary.main, 0.8),
            }
          : {
              backgroundColor: darken(theme.palette.primary.dark, 0.6),
            },
      '&.Mui-selected:hover':
        theme.palette.type === 'light'
          ? {
              backgroundColor: lighten(theme.palette.primary.main, 0.8),
            }
          : {
              backgroundColor: darken(theme.palette.primary.dark, 0.6),
            },
      '&:hover':
        theme.palette.type === 'light'
          ? {
              backgroundColor: lighten(theme.palette.primary.main, 0.8),
            }
          : {
              backgroundColor: darken(theme.palette.primary.dark, 0.6),
            }, */
    },
    selected: {},
  });

interface StyledListItemProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  newClasses?: any;
  isSelected: boolean;
}

const StyledListItem = withStyles(styles)((props: StyledListItemProps) => {
  const { children, classes, onClick, newClasses, isSelected, ...other } =
    props;
  return (
    <>
      <MuiListItem
        button
        selected={isSelected}
        onClick={onClick}
        className={`${classes.root} ${newClasses}`}
        {...other}
      >
        {children}
      </MuiListItem>
    </>
  );
});

export default StyledListItem;
