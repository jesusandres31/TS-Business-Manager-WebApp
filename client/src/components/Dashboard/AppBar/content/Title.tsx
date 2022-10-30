import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// context
import { useView } from '../../context/ViewContext';
import { useLanguage } from '../../../../context/LanguageContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default function Title() {
  const classes = useStyles();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { view } = useView();

  function renderSwitch(view: string) {
    switch (view) {
      case 'HOME':
        return 'home';

      case 'REPORTS':
        return 'reports';

      case 'PRODUCTS':
        return 'products';

      case 'CLIENTS':
        return 'clients';

      case 'PROVIDERS':
        return 'providers';

      case 'STAT_PRODUCTS':
        return 'prodStatistics';

      case 'STAT_CLIENTS':
        return 'cliStatistics';

      case 'STAT_PROVIDERS':
        return 'provStatistics';

      case 'STAT_PROFITS':
        return 'profitsStatistics';

      case 'PREFERENCES':
        return 'preferences';

      case 'USERS':
        return 'users';

      case 'BIN_PRODUCTS':
        return 'prodRecycleBin';

      case 'BIN_CLIENTS':
        return 'cliRecycleBin';

      case 'BIN_PROVIDERS':
        return 'provRecycleBin';

      case 'BIN_USERS':
        return 'usersRecycleBin';

      default:
        return '';
    }
  }

  return (
    <Typography variant="h5" noWrap className={classes.title}>
      {translate(renderSwitch(view))}
    </Typography>
  );
}
