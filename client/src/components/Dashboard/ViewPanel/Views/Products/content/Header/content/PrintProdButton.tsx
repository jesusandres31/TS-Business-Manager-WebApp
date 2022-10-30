// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useProductsPDF';
// components
import { PrintButton } from '../../../../../common/Table/Header/Buttons';

export default function PrintProdButton() {
  const printOrExport = usePrintOrExportPDF();

  return <PrintButton printOrExport={printOrExport} />;
}
