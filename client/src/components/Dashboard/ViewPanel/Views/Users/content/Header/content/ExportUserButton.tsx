// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useUsersPDF';
// components
import { ExportButton } from '../../../../../common/Table/Header/Buttons';

export default function ExportUserButton() {
  const printOrExport = usePrintOrExportPDF();

  return <ExportButton printOrExport={printOrExport} />;
}
