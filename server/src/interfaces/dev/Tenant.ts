import { IManag } from './Manager';

export interface ITen {
  profile: string;
  company_name: string;
  language: string;
  locality: string;
  max_members: number;
  phone: string;
  email: string;
  website: string;
  payment_type_id: string;
  product_type_id: string;
  sale_type_id: string;
  manager: IManag;
}
