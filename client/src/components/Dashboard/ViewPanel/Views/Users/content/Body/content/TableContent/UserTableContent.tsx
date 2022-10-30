import React from 'react';
// global context
import { useAppDispatch } from '../../../../../../../../../app/store';
import {
  selectUser,
  useUsersSelector,
} from '../../../../../../../../../features/users/usersSlice';
// hooks
import { useRoles } from '../../../../../../../../../hooks/useRoles';
// interface
import { Column } from '../../UserTableBody';
import { User } from '../../../../../../../../../api/user.services';
// context
import { useCollapsed } from '../../../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../../../context/LanguageContext';
// components
import {
  StyledTableCell,
  TableContent,
} from '../../../../../../common/Table/Body/content/TableContent';

interface UserTableContentProps {
  row: User | any;
  labelId: string;
  columns: Column[];
  isCollapse: boolean;
}

export default function UserTableContent({
  row,
  labelId,
  columns,
  isCollapse,
}: UserTableContentProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { user } = useUsersSelector((state) => state.users);

  const { collapsed, setCollapsed } = useCollapsed();

  const { indexRoleName } = useRoles();

  const handleClick = (event: React.MouseEvent<unknown>, row: any) => {
    let newSelected: User | null = null;
    if (user === row) {
      // close collapse
      setCollapsed('');
    } else {
      newSelected = row;
      // close collapse
      if (collapsed !== row.id) {
        setCollapsed('');
      }
    }
    dispatch(selectUser(newSelected));
  };

  const fixCollapse = () => {
    setCollapsed(row.id);
    // deselect item if needed
    if (user) {
      if (user.id !== row.id) {
        dispatch(selectUser(null));
      }
    }
  };

  return (
    <TableContent
      row={row}
      labelId={labelId}
      isCollapse={isCollapse}
      selectedItem={user}
      handleClick={handleClick}
      fixCollapse={fixCollapse}
    >
      {columns.map((column) => {
        let value = row[column.id];

        // getting name of role
        if (column.id === 'role_id' && typeof value === 'number') {
          value = translate(indexRoleName(value));
        }

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
