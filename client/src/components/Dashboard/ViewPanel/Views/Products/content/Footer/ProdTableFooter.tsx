// global state
import { useProductsSelector } from '../../../../../../../features/products/productsSlice';
// components
import { TableFooter } from '../../../../common/Table/Footer';

export default function ProdTableFooter() {
  const { products } = useProductsSelector((state) => state.products);
  const rows = products.filter((row) => row.enabled);

  return <TableFooter rows={rows} />;
}
