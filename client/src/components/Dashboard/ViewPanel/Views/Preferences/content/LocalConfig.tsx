import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
// child componentes
import ModeSwitch from './LocalConf/ModeSwitch';
import LocalLangSelector from './LocalConf/LocalLangSelector';

interface LocalConfigProps {
  classes: any;
}

export default function LocalConfig({ classes }: LocalConfigProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h4" className={classes.typography}>
          {translate('localSettings')}
        </Typography>
        <Typography variant="subtitle2" className={classes.typography}>
          {translate('localSettingsSub')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <FormGroup>
        <Grid container spacing={0} className={classes.content}>
          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <LocalLangSelector />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box pt={4} display="flex" justifyContent="flex-start">
              <ModeSwitch />
            </Box>
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
}
