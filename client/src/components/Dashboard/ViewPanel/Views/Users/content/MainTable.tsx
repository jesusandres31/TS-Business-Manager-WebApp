import Paper from '@material-ui/core/Paper';
// children components
import UserTableHeader from './Header/UserTableHeader';
import UserTableBody from './Body/UserTableBody';
import UserTableFooter from './Footer/UserTableFooter';

export default function MainTable() {
  return (
    <Paper>
      <UserTableHeader />
      <UserTableBody />
      <UserTableFooter />
    </Paper>
  );
}
