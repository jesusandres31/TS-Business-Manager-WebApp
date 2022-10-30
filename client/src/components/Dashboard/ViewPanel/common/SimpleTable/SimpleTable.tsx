import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    height: '81.4vh',
  },
}));

interface SimpleTableProps {
  children: React.ReactNode;
}

export default function SimpleTable({ children }: SimpleTableProps) {
  const classes = useStyles();

  return (
    <Paper>
      <TableContainer className={classes.tableContainer}>
        <Table>{children}</Table>
      </TableContainer>
    </Paper>
  );
}
