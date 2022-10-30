import { useEffect, useState } from 'react';
// global state
import { useProvidersSelector } from '../../../../../../../features/providers/providersSlice';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
import { useRoles } from '../../../../../../../hooks/useRoles';
// components
import { TableHeader } from '../../../../common/Table/Header';
import { SearchField } from '../../../../common/Table/Header/Buttons';
// child components
import PrintProvButton from './content/PrintProvButton';
import ExportProvButton from './content/ExportProvButton';
import InfoProvButton from './content/InfoProvButton';
import AddProvButton from './content/AddProvButton';
import EditProvButton from './content/EditProvButton';
import DeleteProvButton from './content/DeleteProvButton';
import RecoverProvButton from './content/RecoverProvButton';

export default function ProvTableHeader() {
  const { provider } = useProvidersSelector((state) => state.providers);

  const { isRecycleBin } = useIsRecycleBin();

  const { isMobile } = useIsMobile();

  const { checkRole } = useRoles();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (provider) {
      setTitle(provider.company_name);
    }
  }, [provider]);

  return (
    <TableHeader title={title} isItemSelected={provider ? true : false}>
      <>
        <SearchField />
      </>
      <>
        {isRecycleBin ? (
          <>
            <RecoverProvButton />
          </>
        ) : (
          <>
            <InfoProvButton />
            {checkRole(['manager', 'admin']) ? <EditProvButton /> : null}
            {checkRole(['manager', 'admin']) ? <DeleteProvButton /> : null}
          </>
        )}
      </>
      <>
        {isRecycleBin ? null : (
          <>
            <ExportProvButton />
            {isMobile ? null : <PrintProvButton />}
            {checkRole(['manager', 'admin']) ? <AddProvButton /> : null}
          </>
        )}
      </>
    </TableHeader>
  );
}
