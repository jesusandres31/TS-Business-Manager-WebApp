import { useEffect, useState } from 'react';
// global state
import { useProductsSelector } from '../../../../../../../features/products/productsSlice';
// hooks
import { useIsMobile } from '../../../../../../../hooks/useIsMobile';
import { useIsRecycleBin } from '../../../../common/hooks/useIsRecycleBin';
import { useRoles } from '../../../../../../../hooks/useRoles';
// components
import { TableHeader } from '../../../../common/Table/Header';
import { SearchField } from '../../../../common/Table/Header/Buttons';
// child components
import PrintProdButton from './content/PrintProdButton';
import ExportProdButton from './content/ExportProdButton';
import AddProdButton from './content/AddProdButton';
import EditProdButton from './content/EditProdButton';
import DeleteProdButton from './content/DeleteProdButton';
import RecoverProdButton from './content/RecoverProdButton';

export default function ProdTableHeader() {
  const { product } = useProductsSelector((state) => state.products);

  const { isRecycleBin } = useIsRecycleBin();

  const { isMobile } = useIsMobile();

  const { checkRole } = useRoles();

  const [title, setTitle] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.name);
    }
  }, [product]);

  return (
    <TableHeader title={title} isItemSelected={product ? true : false}>
      <>
        <SearchField />
      </>
      <>
        {isRecycleBin ? (
          <>
            <RecoverProdButton />
          </>
        ) : (
          <>
            {checkRole(['manager', 'admin']) ? <EditProdButton /> : null}
            {checkRole(['manager', 'admin']) ? <DeleteProdButton /> : null}
          </>
        )}
      </>
      <>
        {isRecycleBin ? null : (
          <>
            <ExportProdButton />
            {isMobile ? null : <PrintProdButton />}
            {checkRole(['manager', 'admin']) ? <AddProdButton /> : null}
          </>
        )}
      </>
    </TableHeader>
  );
}
