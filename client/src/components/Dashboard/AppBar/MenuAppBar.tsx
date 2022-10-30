import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {
  makeStyles,
  Theme,
  createStyles,
  lighten,
  darken,
} from '@material-ui/core/styles';
// const
import { drawerWidth } from '../Main';
// child componentes
import LoginButton from './content/LoginButton';
import Title from './content/Title';
import Notification from './content/Notification';
// context
import { useOpenDrawer } from '../context/DrawerContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    color:
      theme.palette.type === 'light'
        ? {
            backgroundColor: lighten(theme.palette.primary.main, 0.0),
          }
        : {
            backgroundColor: darken(theme.palette.primary.main, 0.3),
          },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        backgroundColor: lighten(theme.palette.primary.main, 0.0),
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
);

export default function MenuAppBar() {
  const classes = useStyles();

  const { openDrawer, setOpenDrawer } = useOpenDrawer();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={classes.color}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Title />

          {/* <Notification /> */}

          <LoginButton />
        </Toolbar>
      </div>
    </AppBar>
  );
}
