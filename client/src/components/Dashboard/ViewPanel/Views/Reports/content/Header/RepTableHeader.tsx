import { useEffect, useState } from 'react';
// global state
import { useInvoicesSelector } from '../../../../../../../features/invoices/invoicesSlice';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
import { useClient } from '../../../../../../../hooks/useClient';
import { useRoles } from '../../../../../../../hooks/useRoles';
// components
import { TableHeader } from '../../../../common/Table/Header';
import { SearchField } from '../../../../common/Table/Header/Buttons';
// interface
import { IDate } from '../../../../../../../interfaces';
// child components
import PrintRepButton from './content/PrintRepButton';
import ExportRepButton from './content/ExportRepButton';
import AddRepButton from './content/AddRepButton';
import MenuRepButton from './content/MenuRepButton';
import EditRepButton from './content/EditRepButton';
import DeleteRepButton from './content/DeleteRepButton';
import FiltersRepButton from './content/FiltersRepButton';
import FiltersRepBar from './content/Bar/FiltersRepBar';

interface RepTableHeaderProps {
  specificDate: Date | null;
  setSpecificDate: React.Dispatch<React.SetStateAction<Date | null>>;
  rangedDate: IDate;
  setRangedDate: React.Dispatch<React.SetStateAction<IDate>>;
}

export default function RepTableHeader({
  specificDate,
  setSpecificDate,
  rangedDate,
  setRangedDate,
}: RepTableHeaderProps) {
  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const { isMobile } = useIsMobile();

  const { checkRole } = useRoles();

  const { indexClientCompanyName } = useClient();

  const [showFilters, setShowFilters] = useState(false);

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (invoice) {
      // formating date
      let date = '';
      let dateObject = new Date(invoice.created);
      date = dateObject.toLocaleDateString('en-GB');
      // get client company_name
      let companyName = indexClientCompanyName(invoice.client_id);
      // setting title
      let title = `[${invoice.id}]  \u00A0\u00A0\u00A0${companyName} \u00A0\u00A0\u00A0${date}`;
      setTitle(title);
    }
  }, [invoice]);

  return (
    <TableHeader title={title} isItemSelected={invoice ? true : false}>
      <>
        <FiltersRepButton
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          specificDate={specificDate}
          rangedDate={rangedDate}
        />
        {showFilters ? (
          <FiltersRepBar
            specificDate={specificDate}
            setSpecificDate={setSpecificDate}
            rangedDate={rangedDate}
            setRangedDate={setRangedDate}
          />
        ) : (
          <>
            <SearchField />
            {checkRole(['manager', 'admin', 'seller']) ? (
              <AddRepButton />
            ) : null}
            <MenuRepButton />
          </>
        )}
      </>
      <>
        <ExportRepButton />
        {isMobile ? null : <PrintRepButton />}
        {checkRole(['manager', 'admin', 'seller']) ? <EditRepButton /> : null}
        {checkRole(['manager', 'admin', 'seller']) ? <DeleteRepButton /> : null}
      </>
      <>{null}</>
    </TableHeader>
  );
}
