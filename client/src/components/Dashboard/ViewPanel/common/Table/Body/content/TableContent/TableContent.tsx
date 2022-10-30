import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// hook
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';
// context
import { useCollapsed } from '../../../../context/CollapsedContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    notSticky: {
      padding: '0px',
    },
    sticky: {
      position: 'sticky',
      right: '0',
      background: theme.palette.background.default,
      padding: '0px',
    },
  })
);

interface TableContentProps {
  row: any;
  labelId: string;
  isCollapse: boolean;
  selectedItem: any;
  handleClick: (event: React.MouseEvent<unknown>, row: any) => void;
  fixCollapse: () => void;
  children: React.ReactNode;
}

export default function TableContent({
  row,
  labelId,
  isCollapse,
  selectedItem,
  handleClick,
  fixCollapse,
  children,
}: TableContentProps) {
  const classes = useStyles();

  const { collapsed, setCollapsed } = useCollapsed();

  const { isMobile } = useIsMobile();

  const isSelected = (row: any) => (selectedItem === row)!!;
  const isItemSelected = isSelected(row);

  const isCollapsed = (row: any) => collapsed === row.id;
  const isItemCollapsed = isCollapsed(row);

  const handleCollapse = (event: React.MouseEvent<unknown>, row: any) => {
    if (isItemCollapsed) {
      setCollapsed('');
    } else {
      fixCollapse();
    }
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.name}
      selected={isItemSelected}
      className={isCollapse ? classes.root : ''}
    >
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          onClick={(event) => handleClick(event, row)}
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>

      {children}

      {isCollapse ? (
        <TableCell className={isMobile ? classes.sticky : classes.notSticky}>
          <IconButton
            aria-label="expand-row"
            size="medium"
            onClick={(event) => handleCollapse(event, row)}
          >
            {isItemCollapsed ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
      ) : (
        <></>
      )}
    </TableRow>
  );
}
