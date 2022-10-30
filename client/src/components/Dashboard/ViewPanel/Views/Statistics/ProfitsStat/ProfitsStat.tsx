import React from 'react';
import Box from '@material-ui/core/Box';
// components
import { SimpleTable } from '../../../common/SimpleTable';
import { useStyles } from '../Statistics';
// children components
import TotalDebts from './content/TotalDebts';
import GrossProfits from './content/GrossProfits';

export default function ProductsStat() {
  const classes = useStyles();

  return (
    <SimpleTable>
      <Box m={2}>
        <GrossProfits classes={classes} />
        <Box pt={10} />
        <TotalDebts classes={classes} />
      </Box>
    </SimpleTable>
  );
}
