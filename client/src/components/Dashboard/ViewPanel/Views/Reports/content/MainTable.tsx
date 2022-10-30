import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
// interface
import { IDate } from '../../../../../../interfaces';
// children components
import RepTableHeader from './Header/RepTableHeader';
import RepTableBody from './Body/RepTableBody';
import RepTableFooter from './Footer/RepTableFooter';

export default function MainTable() {
  const [rangedDate, setRangedDate] = useState<IDate>({
    dateFrom: null,
    dateTo: null,
  });

  const [specificDate, setSpecificDate] = useState<Date | null>(null);

  return (
    <Paper>
      <RepTableHeader
        specificDate={specificDate}
        setSpecificDate={setSpecificDate}
        rangedDate={rangedDate}
        setRangedDate={setRangedDate}
      />
      <RepTableBody specificDate={specificDate} rangedDate={rangedDate} />
      <RepTableFooter />
    </Paper>
  );
}
