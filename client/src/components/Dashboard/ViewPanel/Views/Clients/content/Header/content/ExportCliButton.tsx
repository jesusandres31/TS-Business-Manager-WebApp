// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useClientsPDF';
// components
import { ExportButton } from '../../../../../common/Table/Header/Buttons';

export default function ExportCliButton() {
  const printOrExport = usePrintOrExportPDF();

  return <ExportButton printOrExport={printOrExport} />;
}
