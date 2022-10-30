import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
// global context
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
// context
import { useLanguage } from '../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../context/SnackbarContext';
// hooks
import { useExtraTypes } from '../../../../../../hooks/useExtraTypes';
// components
import GlobalConfigDialog from './GlobalConf/GlobalConfigDialog';

interface GlobalConfigProps {
  classes: any;
}

export default function GlobalConfig({ classes }: GlobalConfigProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { indexLanguageName } = useExtraTypes();

  const { profile } = useProfileSelector((state) => state.profile);

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { resetSnackbar },
  } = useSnackbar();

  const handleClick = () => {
    setOpenDialog!(true);
    resetSnackbar();
  };

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h4" className={classes.typography}>
          {translate('globalSettings')}
        </Typography>
        <Typography variant="subtitle2" className={classes.typography}>
          {translate('globalSettingsSub')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <FormGroup>
        <Grid container spacing={0} className={classes.content}>
          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate(
                'companyName'
              )}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">
                  {profile.company_name}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate(
                'locality'
              )}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">{profile.locality}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate('phone')}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">{profile.phone}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate('email')}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">{profile.email}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate('website')}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">{profile.website}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box pt={3} display="flex" justifyContent="flex-start">
              <Typography variant="h6">{`${translate(
                'language'
              )}:`}</Typography>
              <Box pl={1} mt={0.5}>
                <Typography variant="subtitle1">
                  {translate(indexLanguageName(profile.language as string))}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Box pt={3} display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={handleClick}>
                {translate('update')}
              </Button>
              <GlobalConfigDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            </Box>
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
}
