import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
// const
import { drawerWidth } from '../Main';
// child components
import DrawerMenu from './content/DrawerMenu';
// context
import { useOpenDrawer } from '../context/DrawerContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      // background: theme.palette.primary.light,
    },
    content: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
  })
);

export default function ResponsiveDrawer(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  const { openDrawer, setOpenDrawer } = useOpenDrawer();

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  // drawer menu
  const drawer = DrawerMenu();

  return (
    <div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={openDrawer}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}
