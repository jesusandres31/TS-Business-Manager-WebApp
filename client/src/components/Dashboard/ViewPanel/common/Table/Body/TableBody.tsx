import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
// common
import { TableLoading } from '../../../../../../common';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      /* height: '100vh',
      maxHeight: 400,
      // maxHeight: 417,
      minHeight: 400, */
      height: '63vh',
    },
    table: {
      minWidth: 750,
    },
  })
);

interface TableBodyProps {
  children: React.ReactNode;
  loading: boolean;
}

export default function TableBody({ children, loading }: TableBodyProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      {loading ? (
        <TableLoading />
      ) : (
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          {children}
        </Table>
      )}
    </TableContainer>
  );
}
