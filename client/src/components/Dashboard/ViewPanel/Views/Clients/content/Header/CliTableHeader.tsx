import { useEffect, useState } from 'react';
// global state
import { useClientsSelector } from '../../../../../../../features/clients/clientsSlice';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
import { useRoles } from '../../../../../../../hooks/useRoles';
// components
import { TableHeader } from '../../../../common/Table/Header';
import { SearchField } from '../../../../common/Table/Header/Buttons';
// child components
import PrintCliButton from './content/PrintCliButton';
import ExportCliButton from './content/ExportCliButton';
import InfoCliButton from './content/InfoCliButton';
import AddCliButton from './content/AddCliButton';
import EditCliButton from './content/EditCliButton';
import DeleteCliButton from './content/DeleteCliButton';
import RecoverCliButton from './content/RecoverCliButton';
import DebtsCliButton from './content/DebtsCliButton';

interface CliTableHeaderProps {
  showCliWithDebts: boolean;
  setShowCliWithDebts: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CliTableHeader({
  showCliWithDebts,
  setShowCliWithDebts,
}: CliTableHeaderProps) {
  const { client } = useClientsSelector((state) => state.clients);

  const { isRecycleBin } = useIsRecycleBin();

  const { isMobile } = useIsMobile();

  const { checkRole } = useRoles();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (client) {
      setTitle(client.company_name);
    }
  }, [client]);

  return (
    <TableHeader title={title} isItemSelected={client ? true : false}>
      <>
        <DebtsCliButton
          showCliWithDebts={showCliWithDebts}
          setShowCliWithDebts={setShowCliWithDebts}
        />

        <SearchField />
      </>
      <>
        {isRecycleBin ? (
          <>
            <RecoverCliButton />
          </>
        ) : (
          <>
            <InfoCliButton />
            {checkRole(['manager', 'admin']) ? <EditCliButton /> : null}
            {checkRole(['manager', 'admin']) ? <DeleteCliButton /> : null}
          </>
        )}
      </>
      <>
        {isRecycleBin ? null : (
          <>
            <ExportCliButton />
            {isMobile ? null : <PrintCliButton />}
            {checkRole(['manager', 'admin']) ? <AddCliButton /> : null}
          </>
        )}
      </>
    </TableHeader>
  );
}
