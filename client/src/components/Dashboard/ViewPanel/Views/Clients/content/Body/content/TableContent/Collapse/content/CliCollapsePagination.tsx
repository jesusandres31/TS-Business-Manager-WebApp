import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
// global state
import { useAppDispatch } from '../../../../../../../../../../../app/store';
import {
  useCheckingAccountsSelector,
  fetchCheckingAccByClient,
} from '../../../../../../../../../../../features/checking_accounts/checkingAccountsSlice';
// context
import { useLanguage } from '../../../../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../../../../context/SnackbarContext';
// constants
import { checkingAccLength } from './../../../../../../../../../../../constants';

interface CliCollapsePaginationProps {
  clientId: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CliCollapsePagination({
  clientId,
  page,
  setPage,
}: CliCollapsePaginationProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { checkingAccounts } = useCheckingAccountsSelector(
    (state) => state.checkingAccounts
  );

  const handleNextPage = () => {
    let pageNumber = page + 1;
    dispatch(fetchCheckingAccByClient({ clientId, pageNumber }))
      .then(unwrapResult)
      .then(() => {
        setPage(pageNumber);
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  const handleBackPage = () => {
    let pageNumber = page - 1;
    dispatch(fetchCheckingAccByClient({ clientId, pageNumber }))
      .then(unwrapResult)
      .then(() => {
        setPage(pageNumber);
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Tooltip title={translate('back')}>
        <IconButton
          aria-label="add"
          onClick={handleBackPage}
          disabled={page === 1}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={translate('next')}>
        <IconButton
          aria-label="add"
          onClick={handleNextPage}
          disabled={checkingAccounts.length < checkingAccLength}
        >
          <NavigateNextIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
}
