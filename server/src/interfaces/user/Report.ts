import { IRepDet } from './ReportDetail';

export interface IRep {
  client_id: number;
  user_id: number;
  sale_type_id: number;
  payment_type_id: number;
  created: string;
  fee_percentageTotal: number;
  total: number;
  payment: number;
  debt: number;
  old_debt: number;
  report_details: Array<IRepDet>;
}
