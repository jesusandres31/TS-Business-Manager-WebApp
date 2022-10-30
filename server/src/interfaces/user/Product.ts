import { IProvDet } from './ProviderDetail';

export interface IProd {
  product_type_id: number;
  name: string;
  stock: number;
  sale_price: number;
  barcode: string;
  min_stock: number;
  provider_details: Array<IProvDet>;
}
