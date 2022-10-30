import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// interface
import { IProfits } from '../../../../../../../api/statistic.services';
// context
import { useLanguage } from '../../../../../../../context/LanguageContext';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
// components
import GrossProfitsFilter from './GrossProfits/GrossProfitsFilter';

interface GrossProfitsProps {
  classes: any;
}

export default function GrossProfits({ classes }: GrossProfitsProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { isMobile } = useIsMobile();

  const [grossProfits, setGrossProfits] = useState<IProfits>({
    total: 0,
  });

  return (
    <Container className={classes.container}>
      <Box pb={1}>
        <Typography variant="h4" className={classes.typography}>
          {translate('grossProfits')}
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Grid container spacing={0} className={classes.content}>
        <GrossProfitsFilter setGrossProfits={setGrossProfits} />

        <Divider variant="middle" />

        <Grid item xs={12} sm={12}>
          <Box pt={6}>
            <Typography variant={isMobile ? 'h4' : 'h2'}>
              {`$ ${grossProfits.total ? grossProfits.total : 0}`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
