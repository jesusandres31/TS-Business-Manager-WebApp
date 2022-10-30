import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// context
import { useLanguage } from '../../../../context/LanguageContext';

export default function HelpGrid(): JSX.Element {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <Grid container>
      <Grid item xs>
        <Link href="#" variant="body2">
          {translate('forgotPass')}
        </Link>
      </Grid>
      <Grid item>
        <Link href="#" variant="body2">
          {translate('signup')}
        </Link>
      </Grid>
    </Grid>
  );
}
