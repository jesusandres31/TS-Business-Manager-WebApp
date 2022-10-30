import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: 400,
    },
  })
);

interface InfoPopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
  handleClose: () => void;
  children: JSX.Element[];
}

export default function InfoPopover({
  open,
  anchorEl,
  setAnchorEl,
  handleClose,
  children,
}: InfoPopoverProps) {
  const classes = useStyles();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      className={classes.root}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box fontWeight="fontWeightBold">{children[0]}</Box>
      <Divider variant="middle" />
      <List>{children[1]}</List>
    </Popover>
  );
}
