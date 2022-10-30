import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
// global state
import { useAppDispatch } from '../../../../../../../../../../app/store';
import { fetchArticlesToDistribute } from '../../../../../../../../../../features/invoices/invoiceFormSlice';
// hooks
import { useArticlesToDistributePDF } from '../../../../../../../../../../hooks/PDF/useArticlesToDistributePDF';
// interface
import { IDate } from '../../../../../../../../../../interfaces';
// utils
import { formatDate } from '../../../../../../../../../../utils/formatDate';
// context
import { useSnackbar } from '../../../../../../../../../../context/SnackbarContext';
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
// components
import { DialogActions } from '../../../../../../../common/Forms/FormFooter';

interface ArticlesToDistributeFormFooterProps {
  handleClose: () => void;
  date: IDate;
}

export default function ArticlesToDistributeFormFooter({
  handleClose,
  date,
}: ArticlesToDistributeFormFooterProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const dispatch = useAppDispatch();

  const printArticlesToDistribute = useArticlesToDistributePDF();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const handleSubmit = (isPrint: boolean) => {
    handleGerArticlesToDistribute(date, isPrint);
  };

  const handleGerArticlesToDistribute = async (
    date: IDate,
    isPrint: boolean
  ) => {
    const formatedDate: IDate = {
      dateFrom: formatDate(date.dateFrom as Date),
      dateTo: formatDate(date.dateTo as Date),
    };
    // dispatch
    dispatch(fetchArticlesToDistribute(formatedDate))
      .then(unwrapResult)
      .then((payload) => {
        printArticlesToDistribute(payload, isPrint);
        handleClose();
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  return (
    <DialogActions>
      <Button
        autoFocus
        color="primary"
        style={{ fontWeight: 600 }}
        onClick={() => handleSubmit(false)}
      >
        {translate('download')}
      </Button>

      <Button
        autoFocus
        color="primary"
        style={{ fontWeight: 600 }}
        onClick={() => handleSubmit(true)}
      >
        {translate('print')}
      </Button>
    </DialogActions>
  );
}
