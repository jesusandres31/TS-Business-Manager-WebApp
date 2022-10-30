// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useProductsPDF';
// components
import { ExportButton } from '../../../../../common/Table/Header/Buttons';

export default function ExportProdButton() {
  const printOrExport = usePrintOrExportPDF();

  return <ExportButton printOrExport={printOrExport} />;
}
