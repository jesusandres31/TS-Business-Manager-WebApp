import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Grid';
// interface
import { ReportDetailForm } from '../../../../../../../api/invoice.services';
// child componentes
import MainTable from './Table/MainTable';

interface DetailSectionProps {
  classes: any;
  selectedItem: ReportDetailForm | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<ReportDetailForm | null>
  >;
}

export default function DetailSection({
  classes,
  selectedItem,
  setSelectedItem,
}: DetailSectionProps) {
  return (
    <Grid container spacing={1} className={classes.content}>
      <Grid item xs={12} sm={12}>
        <MainTable
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Grid>
    </Grid>
  );
}
