import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
// child componentes
import ClientInput from './Header/ClientInput';
import CreatedInput from './Header/CreatedInput';
import PaymentTypeInput from './Header/PaymentTypeInput';
import SaleTypeInput from './Header/SaleTypeInput';
import CreateANewClientButton from './Header/CreateANewClientButton';

interface HeaderSectionProps {
  classes: any;
}

export default function HeaderSection({ classes }: HeaderSectionProps) {
  return (
    <Container className={classes.container}>
      <FormGroup>
        <Box pb={2}>
          <Grid container spacing={2} className={classes.content}>
            <Grid item xs={12} sm={1}>
              <Box display="flex" justifyContent="center">
                <CreateANewClientButton />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <ClientInput />
              </Box>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Box display="flex" justifyContent="center">
                <CreatedInput />
              </Box>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Box display="flex" justifyContent="center">
                <PaymentTypeInput />
              </Box>
            </Grid>

            <Grid item xs={12} sm={2}>
              <Box display="flex" justifyContent="center">
                <SaleTypeInput />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormGroup>
      <Box pt={1}>{/* <Divider variant="fullWidth" /> */}</Box>
    </Container>
  );
}
