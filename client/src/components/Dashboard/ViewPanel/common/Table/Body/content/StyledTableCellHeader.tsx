import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCellHeader = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: theme.palette.text.primary,
      paddingLeft: '7px',
      padding: '14px',
    },
  })
)(TableCell);

export default StyledTableCellHeader;
