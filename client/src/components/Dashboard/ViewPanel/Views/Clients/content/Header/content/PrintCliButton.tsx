// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useClientsPDF';
// components
import { PrintButton } from '../../../../../common/Table/Header/Buttons';

export default function PrintCliButton() {
  const printOrExport = usePrintOrExportPDF();

  return <PrintButton printOrExport={printOrExport} />;
}
