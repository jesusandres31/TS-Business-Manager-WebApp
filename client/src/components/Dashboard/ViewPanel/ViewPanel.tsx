import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useView } from '../context/ViewContext';
// child components
import Error401 from '../../../common/Error401';
import {
  Home,
  Reports,
  Products,
  Clients,
  Preferences,
  Providers,
  ClientsStat,
  ProductsStat,
  ProvidersStat,
  ProfitsStat,
  Users,
} from './Views';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      height: '100vh',
      // flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function ViewPanel() {
  const classes = useStyles();

  const { view } = useView();

  function renderSwitch(view: string) {
    switch (view) {
      case 'HOME':
        return <Home />;
      case 'REPORTS':
        return <Reports />;
      case 'PRODUCTS':
        return <Products />;
      case 'CLIENTS':
        return <Clients />;
      case 'PROVIDERS':
        return <Providers />;
      case 'STAT_PRODUCTS':
        return <ProductsStat />;
      case 'STAT_CLIENTS':
        return <ClientsStat />;
      case 'STAT_PROVIDERS':
        return <ProvidersStat />;
      case 'STAT_PROFITS':
        return <ProfitsStat />;
      case 'PREFERENCES':
        return <Preferences />;
      case 'USERS':
        return <Users />;
      case 'BIN_PRODUCTS':
        return <Products />;
      case 'BIN_CLIENTS':
        return <Clients />;
      case 'BIN_PROVIDERS':
        return <Providers />;
      case 'BIN_USERS':
        return <Users />;
      default:
        return <Error401 />;
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {renderSwitch(view)}
    </main>
  );
}
