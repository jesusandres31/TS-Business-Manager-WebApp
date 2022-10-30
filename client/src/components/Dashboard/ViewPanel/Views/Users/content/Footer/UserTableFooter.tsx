// global state
import { useUsersSelector } from '../../../../../../../features/users/usersSlice';
// components
import { TableFooter } from '../../../../common/Table/Footer';

export default function UserTableFooter() {
  const { users } = useUsersSelector((state) => state.users);
  const rows = users.filter((row) => row.enabled);

  return <TableFooter rows={rows} />;
}
