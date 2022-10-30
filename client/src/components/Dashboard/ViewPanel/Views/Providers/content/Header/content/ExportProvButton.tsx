// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useProvidersPDF';
// components
import { ExportButton } from '../../../../../common/Table/Header/Buttons';

export default function ExportProvButton() {
  const printOrExport = usePrintOrExportPDF();

  return <ExportButton printOrExport={printOrExport} />;
}
