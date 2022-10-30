import { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  selectUser,
  useUsersSelector,
} from '../../../../../../../../features/users/usersSlice';
// context
import { useView } from '../../../../../../context/ViewContext';
import { useFilter } from '../../../../../common/context/FilterContext';
import { usePage } from '../../../../../common/context/PageContext';
import { useRowsPerPage } from '../../../../../../context/RowsPerPageContext';
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// hooks
import { useRoles } from '../../../../../../../../hooks/useRoles';
import { useIsRecycleBin } from '../../../../../common/hooks/useIsRecycleBin';
// interface
import { User } from '../../../../../../../../api/user.services';
import { Column } from '../UserTableBody';
// utils
import {
  Order,
  stableSort,
  getComparator,
} from '../../../../../../../../utils/sorting';
// children components
import UserTableContent from './TableContent/UserTableContent';

interface UserTableBodyContainerProps {
  order: Order;
  orderBy: keyof User;
  columns: Column[];
  isCollapse: boolean;
}

export default function UserTableBodyContainer({
  order,
  orderBy,
  columns,
  isCollapse,
}: UserTableBodyContainerProps) {
  const dispatch = useAppDispatch();

  const { view } = useView();

  const { filter, setFilter } = useFilter();

  const { isRecycleBin } = useIsRecycleBin();

  const { page } = usePage();

  const { rowsPerPage } = useRowsPerPage();

  const { users } = useUsersSelector((state) => state.users);

  const {
    dispatch: { translate },
  } = useLanguage();

  const { indexRoleName } = useRoles();

  const [rows, setRows] = useState<User[]>([]);

  // getting enabled or disabled rows
  useEffect(() => {
    if (isRecycleBin) {
      const disabledUsers = users.filter((row) => !row.enabled);
      setRows(disabledUsers);
    } else {
      const enabledUsers = users.filter((row) => row.enabled);
      setRows(enabledUsers);
    }
    dispatch(selectUser(null));
    setFilter('');
  }, [view]);

  // filter function
  let filterRows = {} as User[];
  if (filter.length !== 0) {
    filterRows = rows.filter((row) => {
      return (
        row.name.toLowerCase().includes(filter.toLowerCase()) ||
        row.surname.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.email.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.username.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.phone.toString().toLowerCase().includes(filter.toLowerCase()) ||
        row.locality.toString().toLowerCase().includes(filter.toLowerCase()) ||
        translate(indexRoleName(row.role_id))
          .toString()
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });
  }

  return (
    <TableBody>
      {stableSort(filter ? filterRows : rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `table-row-${index}`;

          return (
            <UserTableContent
              row={row}
              labelId={labelId}
              key={labelId}
              columns={columns}
              isCollapse={isCollapse}
            />
          );
        })}
    </TableBody>
  );
}
