import Paper from '@material-ui/core/Paper';
// children components
import ProdTableHeader from './Header/ProdTableHeader';
import ProdTableBody from './Body/ProdTableBody';
import ProdTableFooter from './Footer/ProdTableFooter';

export default function MainTable() {
  return (
    <Paper>
      <ProdTableHeader />
      <ProdTableBody />
      <ProdTableFooter />
    </Paper>
  );
}
