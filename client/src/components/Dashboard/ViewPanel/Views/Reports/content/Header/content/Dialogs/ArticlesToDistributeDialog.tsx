import React, { useState } from 'react';
// global state
import { useInvoiceFormSelector } from '../../../../../../../../../features/invoices/invoiceFormSlice';
// interface
import { IDate } from '../../../../../../../../../interfaces';
// components
import { CreateOrUpdateDialog } from '../../../../../../common/Dialogs';
// components
import ArticlesToDistributeFormBody from './Forms/ArticlesToDistributeFormBody';
import ArticlesToDistributeFormFooter from './Forms/ArticlesToDistributeFormFooter';
import ArticlesToDistributeFormHeader from './Forms/ArticlesToDistributeFormHeader';

interface ArticlesToDistributeDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ArticlesToDistributeDialog({
  openDialog,
  setOpenDialog,
}: ArticlesToDistributeDialogProps) {
  const { loading } = useInvoiceFormSelector((state) => state.invoiceForm);

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateInitialState: IDate = {
    dateFrom: today,
    dateTo: today,
  };

  const [date, setDate] = useState(dateInitialState);

  const handleClose = () => {
    setOpenDialog(false);
    setDate(dateInitialState);
  };

  return (
    <>
      <CreateOrUpdateDialog
        openDialog={openDialog}
        handleClose={handleClose}
        loading={loading}
      >
        <ArticlesToDistributeFormHeader handleClose={handleClose} />
        <ArticlesToDistributeFormBody date={date} setDate={setDate} />
        <ArticlesToDistributeFormFooter handleClose={handleClose} date={date} />
      </CreateOrUpdateDialog>
    </>
  );
}
