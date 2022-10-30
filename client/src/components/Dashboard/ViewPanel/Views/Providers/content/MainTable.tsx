import Paper from '@material-ui/core/Paper';
// children components
import ProvTableHeader from './Header/ProvTableHeader';
import ProvTableBody from './Body/ProvTableBody';
import ProvTableFooter from './Footer/ProvTableFooter';

export default function MainTable() {
  return (
    <Paper>
      <ProvTableHeader />
      <ProvTableBody />
      <ProvTableFooter />
    </Paper>
  );
}
