import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  lighten,
  darken,
} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// context
import { useView, View } from '../../context/ViewContext';
import { useOpenDrawer } from '../../context/DrawerContext';
// children components
import ListHome from './Lists/ListHome';
import ListApp from './Lists/ListApp';
import ListSet from './Lists/ListSet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    root: {
      width: '100%',
      maxWidth: 360,
      // background: theme.palette.primary.light,
      backgroundColor: theme.palette.background.paper,
      // text color
      // color: theme.palette.text.secondary,
    },
    icon: {
      color: theme.palette.primary.main,
      padding: 0,
    },
    listItem: {
      minWidth: '40px',
    },
    avatar: {
      backgroundColor: lighten(theme.palette.primary.main, 0.1),
      height: '28px',
      width: '28px',
    },
  })
);

export default function DrawerMenu() {
  const classes = useStyles();

  const { setView } = useView();

  const { openDrawer, setOpenDrawer } = useOpenDrawer();

  function handleClick(view: View) {
    if (openDrawer) {
      setView(view);
      setOpenDrawer(!openDrawer);
    } else {
      setView(view);
    }
  }

  return (
    <>
      <ListHome handleClick={handleClick} classes={classes} />
      <Divider variant="middle" />
      <ListApp handleClick={handleClick} classes={classes} />
      <Divider variant="middle" />
      <ListSet handleClick={handleClick} classes={classes} />
    </>
  );
}
