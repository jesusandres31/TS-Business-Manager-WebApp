import React from 'react';
// global context
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  selectClient,
  useClientsSelector,
} from '../../../../../../../../../features/clients/clientsSlice';
// interface
import { Column } from '../../CliTableBody';
import { Client } from '../../../../../../../../../api/client.services';
// hooks
import { useIsRecycleBin } from '../../../../../../common/hooks/useIsRecycleBin';
// context
import { useCollapsed } from '../../../../../../common/context/CollapsedContext';
// components
import {
  StyledTableCell,
  TableContent,
} from '../../../../../../common/Table/Body/content/TableContent';
import CliCollapseContent from './Collapse/CliCollapseContent';

interface CliTableContentProps {
  row: Client | any;
  labelId: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function CliTableContent({
  row,
  labelId,
  columns,
  isCollapse,
}: CliTableContentProps) {
  const dispatch = useAppDispatch();

  const { client } = useClientsSelector((state) => state.clients);

  const { collapsed, setCollapsed } = useCollapsed();

  const { isRecycleBin } = useIsRecycleBin();

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    let newSelected: Client | null = null;
    if (client === row) {
      // close collapse
      setCollapsed('');
    } else {
      newSelected = row;
      // close collapse
      if (collapsed !== row.id) {
        setCollapsed('');
      }
    }
    dispatch(selectClient(newSelected));
  };

  const fixCollapse = () => {
    setCollapsed(row.id);
    // deselect item if needed
    if (client) {
      if (client.id !== row.id) {
        dispatch(selectClient(null));
      }
    }
  };

  return (
    <>
      <TableContent
        row={row}
        labelId={labelId}
        isCollapse={isCollapse}
        selectedItem={client}
        handleClick={handleClick}
        fixCollapse={fixCollapse}
      >
        {columns.map((column) => {
          let value = row[column.id];

          if (column.format && typeof value === 'number') {
            column.format(value);
          }

          // replacing '' by -
          if (value === '') {
            value = '-';
          }

          return (
            <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {value}
            </StyledTableCell>
          );
        })}
      </TableContent>

      {isRecycleBin ? null : <CliCollapseContent row={row} />}
    </>
  );
}
