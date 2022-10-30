// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useUsersPDF';
// components
import { PrintButton } from '../../../../../common/Table/Header/Buttons';

export default function PrintUserButton() {
  const printOrExport = usePrintOrExportPDF();

  return <PrintButton printOrExport={printOrExport} />;
}
