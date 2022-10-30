// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useProvidersPDF';
// components
import { PrintButton } from '../../../../../common/Table/Header/Buttons';

export default function PrintProvButton() {
  const printOrExport = usePrintOrExportPDF();

  return <PrintButton printOrExport={printOrExport} />;
}
