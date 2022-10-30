import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
// components
import StyledTableCellHeader from './StyledTableCellHeader';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sticky: {
      position: 'sticky',
      right: '0',
      background: theme.palette.background.default,
      padding: '0px',
    },
  })
);

interface TableBodyHeaderProps {
  isCollapse: boolean;
  isItemSelected: boolean;
  handleDeselect: () => void;
  children: React.ReactNode;
}

export default function TableBodyHeader({
  isCollapse,
  isItemSelected,
  handleDeselect,
  children,
}: TableBodyHeaderProps) {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            indeterminate={isItemSelected}
            checked={isItemSelected}
            disabled={!isItemSelected}
            onClick={handleDeselect}
            inputProps={{ 'aria-labelledby': 'deselect' }}
          />
        </TableCell>

        {/* <StyledTableCellHeader padding="checkbox" /> */}

        {children}

        {isCollapse ? (
          <StyledTableCellHeader
            padding="checkbox"
            className={classes.sticky}
          />
        ) : null}
      </TableRow>
    </TableHead>
  );
}
