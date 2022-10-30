import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// contex
import { DrawerProvider } from './context/DrawerContext';
import { ViewProvider } from './context/ViewContext';
import { RowsPerPageProvider } from './context/RowsPerPageContext';
// child components
import MenuAppBar from './AppBar/MenuAppBar';
import ResponsiveDrawer from './Drawer/ResponsiveDrawer';
import ViewPanel from './ViewPanel/ViewPanel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:
      theme.palette.type === 'light'
        ? {
            backgroundColor: '#fdfcff',
          }
        : {
            backgroundColor: '#1e2228',
          },
  })
);

export const drawerWidth: number = 210;

export default function Main() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DrawerProvider>
        <ViewProvider>
          <RowsPerPageProvider>
            <CssBaseline />
            <MenuAppBar />
            <ResponsiveDrawer>
              <ViewPanel />
            </ResponsiveDrawer>
          </RowsPerPageProvider>
        </ViewProvider>
      </DrawerProvider>
    </div>
  );
}
