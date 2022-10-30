import React from 'react';
// global context
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  selectProvider,
  useProvidersSelector,
} from '../../../../../../../../../features/providers/providersSlice';
// interface
import { Column } from '../../ProvTableBody';
import { Provider } from '../../../../../../../../../api/provider.services';
// context
import { useCollapsed } from '../../../../../../common/context/CollapsedContext';
// components
import {
  StyledTableCell,
  TableContent,
} from '../../../../../../common/Table/Body/content/TableContent';

interface ProvTableContentProps {
  row: Provider | any;
  labelId: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function ProvTableContent({
  row,
  labelId,
  columns,
  isCollapse,
}: ProvTableContentProps) {
  const dispatch = useAppDispatch();

  const { provider } = useProvidersSelector((state) => state.providers);

  const { collapsed, setCollapsed } = useCollapsed();

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    let newSelected: Provider | null = null;
    if (provider === row) {
      // close collapse
      setCollapsed('');
    } else {
      newSelected = row;
      // close collapse
      if (collapsed !== row.id) {
        setCollapsed('');
      }
    }
    dispatch(selectProvider(newSelected));
  };

  const fixCollapse = () => {
    setCollapsed(row.id);
    // deselect item if needed
    if (provider) {
      if (provider.id !== row.id) {
        dispatch(selectProvider(null));
      }
    }
  };

  return (
    <TableContent
      row={row}
      labelId={labelId}
      isCollapse={isCollapse}
      selectedItem={provider}
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
  );
}
