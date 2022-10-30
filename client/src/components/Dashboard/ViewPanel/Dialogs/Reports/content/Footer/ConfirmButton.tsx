import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// global state
import { useAppDispatch } from '../../../../../../../app/store';
import {
  fetchInvoices,
  useInvoicesSelector,
  selectInvoice,
} from '../../../../../../../features/invoices/invoicesSlice';
import {
  createInvoice,
  updateInvoice,
  resetInvoiceForm,
  useInvoiceFormSelector,
} from '../../../../../../../features/invoices/invoiceFormSlice';
import { resetInvoiceDetailForm } from '../../../../../../../features/invoices/invoiceDetailFormSlice';
// interface
import {
  ReportMaster,
  ReportMasterForm,
} from '../../../../../../../api/invoice.services';
// utils
import { formatDate } from '../../../../../../../utils/formatDate';
// context
import { useSnackbar } from '../../../../../../../context/SnackbarContext';
import { useCollapsed } from '../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../context/LanguageContext';

interface ConfirmButtonProps {
  handleClose: () => void;
  openDialog: boolean;
  pinDialog: boolean;
}

export default function ConfirmButton({
  handleClose,
  openDialog,
  pinDialog,
}: ConfirmButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const dispatch = useAppDispatch();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { invoice } = useInvoicesSelector((state) => state.invoices);

  const { invoiceForm } = useInvoiceFormSelector((state) => state.invoiceForm);

  const { setCollapsed } = useCollapsed();

  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

  const validateInput = (invoiceForm: ReportMasterForm) => {
    if (invoiceForm.report_details.length !== 0 && invoiceForm.client_id) {
      setConfirmButtonDisabled(false);
    } else {
      setConfirmButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInput(invoiceForm);
  }, [invoiceForm]);

  const handleSubmit = () => {
    if (invoice) {
      handleUpdateInvoice(invoice, invoiceForm);
    } else {
      handleCreateInvoice(invoiceForm);
    }
  };

  const handleCreateInvoice = (invoiceData: ReportMasterForm) => {
    dispatch(
      createInvoice({
        client_id: invoiceData.client_id,
        user_id: invoiceData.user_id,
        sale_type_id: invoiceData.sale_type_id,
        payment_type_id: invoiceData.sale_type_id,
        created: formatDate(invoiceData.created as Date),
        fee_percentageTotal: invoiceData.fee_percentageTotal
          ? invoiceData.fee_percentageTotal
          : 0,
        total: invoiceData.total,
        payment: invoiceData.payment,
        debt: invoiceData.debt,
        old_debt: 0,
        report_details: invoiceData.report_details,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('receipt')} ${translate('successCreated')}`
        );
        dispatch(resetInvoiceForm());
        dispatch(resetInvoiceDetailForm());
        dispatch(fetchInvoices());
        dispatch(selectInvoice(null));
        setCollapsed('');
        handleClose();
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleUpdateInvoice = (
    selectedInvoice: ReportMaster,
    invoiceForm: ReportMasterForm
  ) => {
    const invoiceId: number = selectedInvoice.id;
    let invoiceData: ReportMasterForm = {
      ...invoiceForm,
      created: formatDate(new Date(invoiceForm.created)),
    };
    dispatch(updateInvoice({ invoiceId, invoiceData }))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('receipt')} "${invoiceId}" ${translate(
            'successUpdated'
          )}`
        );
        dispatch(resetInvoiceForm());
        dispatch(resetInvoiceDetailForm());
        dispatch(fetchInvoices());
        dispatch(selectInvoice(null));
        setCollapsed('');
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  return (
    <Tooltip
      title={
        confirmButtonDisabled && openDialog
          ? translate('completeTheFields')
          : ''
      }
      arrow
      placement="left-end"
    >
      <span>
        <Button
          autoFocus
          color="primary"
          variant="outlined"
          style={{ fontWeight: 600 }}
          onClick={handleSubmit}
          disabled={confirmButtonDisabled}
        >
          {invoice ? translate('confirm') : translate('create')}
        </Button>
      </span>
    </Tooltip>
  );
}
