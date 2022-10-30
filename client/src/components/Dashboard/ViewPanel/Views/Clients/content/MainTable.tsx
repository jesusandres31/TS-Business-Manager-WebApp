import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
// children components
import CliTableHeader from './Header/CliTableHeader';
import CliTableBody from './Body/CliTableBody';
import CliTableFooter from './Footer/CliTableFooter';

export default function MainTable() {
  const [showCliWithDebts, setShowCliWithDebts] = useState(false);

  return (
    <Paper>
      <CliTableHeader
        showCliWithDebts={showCliWithDebts}
        setShowCliWithDebts={setShowCliWithDebts}
      />
      <CliTableBody showCliWithDebts={showCliWithDebts} />
      <CliTableFooter />
    </Paper>
  );
}
