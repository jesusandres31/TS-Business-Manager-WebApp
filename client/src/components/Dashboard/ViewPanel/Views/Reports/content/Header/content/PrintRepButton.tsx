import { unwrapResult } from '@reduxjs/toolkit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import { fetchInvoiceById } from '../../../../../../../../features/invoices/invoiceFormSlice';
import { useInvoicesSelector } from '../../../../../../../../features/invoices/invoicesSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../context/SnackbarContext';
// hooks
import { usePrintOrExportPDF } from '../../../../../../../../hooks/PDF/useInvoicePDF';
import { useIsMobile } from '../../../../../../../../hooks/useIsMobile';
// interface
import { ReportMaster } from '../../../../../../../../api/invoice.services';

export default function PrintRepButton() {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const printOrExportInvoice = usePrintOrExportPDF();

  const { isMobile } = useIsMobile();

  const title = translate('print');

  const handleClick = () => {
    if (invoice) {
      const isPrint: boolean = true;
      const invoiceId: number = invoice.id;
      dispatch(fetchInvoiceById(invoiceId))
        .then(unwrapResult)
        .then((payload: ReportMaster) => {
          printOrExportInvoice(isPrint, payload);
        })
        .catch((err) => {
          errorSnackbar();
          throw err;
        });
    }
  };

  return (
    <Tooltip title={title}>
      <IconButton
        aria-label="print"
        size={isMobile ? 'small' : 'medium'}
        onClick={handleClick}
      >
        <PrintIcon />
      </IconButton>
    </Tooltip>
  );
}
