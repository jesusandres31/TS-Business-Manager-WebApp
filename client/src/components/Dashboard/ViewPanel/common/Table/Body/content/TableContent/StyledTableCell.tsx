import { withStyles, createStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles(() =>
  createStyles({
    root: {
      paddingLeft: '7px',
      padding: '14px',
    },
  })
)(TableCell);

export default StyledTableCell;
