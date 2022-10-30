import { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// global state
import { useAppDispatch } from '../../../../../../../../../../app/store';
import {
  useCheckingAccountsSelector,
  fetchCheckingAccByClient,
  resetCheckingAccounts,
} from '../../../../../../../../../../features/checking_accounts/checkingAccountsSlice';
// context
import { useCollapsed } from '../../../../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
import { useSnackbar } from '../../../../../../../../../../context/SnackbarContext';
// interface
import { Client } from '../../../../../../../../../../api/client.services';
import { CheckingAcc } from '../../../../../../../../../../api/checkingAccount.services';
// hooks
import { useExtraTypes } from '../../../../../../../../../../hooks/useExtraTypes';
import { useRoles } from '../../../../../../../../../../hooks/useRoles';
// components
import { CollapseContent } from '../../../../../../../common/Table/Body/content/TableContent/Collapse';
import { LoadingCollapseTable } from '../../../../../../../common/CollapseTable';
import { ErrorCollapseTable } from '../../../../../../../common/CollapseTable';
// child components
import EditDebtButton from './content/EditDebtButton';
import CliCollapsePagination from './content/CliCollapsePagination';

interface CollapseColumn {
  id:
    | 'id'
    | 'client_id'
    | 'report_master_id'
    | 'created'
    | 'previous_debt'
    | 'movement';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
}

const collapseColumns: CollapseColumn[] = [
  { id: 'created', label: 'updateDate', minWidth: 100, align: 'right' },
  { id: 'previous_debt', label: 'priorBalance', minWidth: 100, align: 'right' },
  { id: 'movement', label: 'movement', minWidth: 100, align: 'right' },
];

interface CliCollapseContentProps {
  row: Client;
}

export default function CliCollapseContent({ row }: CliCollapseContentProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const {
    dispatch: { translate },
  } = useLanguage();

  const [page, setPage] = useState(1);

  const { checkingAccounts, loading, error } = useCheckingAccountsSelector(
    (state) => state.checkingAccounts
  );

  // sorting
  let sortedCheckingAcc = [...checkingAccounts];
  sortedCheckingAcc.sort(function (a, b) {
    if (a.created > b.created) {
      return 1;
    }
    if (a.created < b.created) {
      return -1;
    }
    return 0;
  });

  const { checkRole } = useRoles();

  const { collapsed } = useCollapsed();

  const isCollapsed = (row: any) => collapsed === row.id;
  const isItemCollapsed = isCollapsed(row);

  const loadCheckingAccount = (client: Client, page: number) => {
    const clientId: number = client.id;
    const pageNumber: number = page;
    dispatch(fetchCheckingAccByClient({ clientId, pageNumber }))
      .then(unwrapResult)
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    if (isItemCollapsed) {
      dispatch(resetCheckingAccounts());
      loadCheckingAccount(row, page);
      setPage(1);
    }
  }, [collapsed]);

  if (error) return <ErrorCollapseTable isItemCollapsed={isItemCollapsed} />;

  return (
    <CollapseContent isItemCollapsed={isItemCollapsed}>
      <Typography variant="subtitle2" style={{ paddingLeft: '30px' }}>
        <Box fontWeight="fontWeightBold">{translate('checkingAccount')}</Box>
      </Typography>
      {loading ? (
        <Table size="small">
          <LoadingCollapseTable isItemCollapsed={isItemCollapsed} />
        </Table>
      ) : checkingAccounts.length === 0 && !loading ? (
        <Typography variant="subtitle2" style={{ paddingLeft: '30px' }}>
          <Box pt={4} pb={2} fontWeight="fontWeightBold">
            {translate('noCheckingAccountRecordsSoFar')}
          </Box>
        </Typography>
      ) : (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                {collapseColumns.map((collapseColumn) => (
                  <TableCell
                    key={collapseColumn.id}
                    align={collapseColumn.align}
                  >
                    <Box fontWeight="fontWeightBold">
                      {translate(collapseColumn.label)}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedCheckingAcc.map((register: CheckingAcc | any) => (
                <TableRow key={register.id}>
                  {collapseColumns.map((collapseColumn) => {
                    let value: string | number | Date =
                      register[collapseColumn.id];

                    // formatting date
                    if (
                      collapseColumn.id === 'created' &&
                      typeof value === 'string'
                    ) {
                      var dateObject = new Date(value);
                      value = dateObject.toLocaleDateString('en-GB');
                    }

                    // adding $ to money value
                    if (
                      collapseColumn.id === 'previous_debt' &&
                      typeof value === 'string'
                    ) {
                      let valueNum = parseFloat(value);
                      let absValue = Math.abs(valueNum);
                      if (valueNum < 0) {
                        value = `- $ ${absValue.toFixed(2)}`;
                      } else {
                        value = `$ ${absValue.toFixed(2)}`;
                      }
                    }

                    // adding $ and sign to money value
                    if (
                      collapseColumn.id === 'movement' &&
                      typeof value === 'string'
                    ) {
                      let valueNum = parseFloat(value);
                      let absValue = Math.abs(valueNum);
                      if (valueNum < 0) {
                        value = `- $ ${absValue.toFixed(2)}`;
                      } else {
                        value = `+ $ ${absValue.toFixed(2)}`;
                      }
                    }

                    return (
                      <TableCell
                        key={collapseColumn.id}
                        align={collapseColumn.align}
                        style={{
                          minWidth: collapseColumn.minWidth,
                        }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid item xs={5} sm={5}>
          <Box pt={3} px={2} display="flex" justifyContent="flex-end">
            {checkRole(['manager', 'admin', 'seller']) ? (
              <Box>
                <EditDebtButton
                  loadCheckingAccount={loadCheckingAccount}
                  row={row}
                  page={page}
                />
              </Box>
            ) : (
              <Box />
            )}
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Box pt={3} px={2} display="flex" justifyContent="flex-end">
            <Typography variant="subtitle2" style={{ display: 'inline-block' }}>
              <Box fontWeight="fontWeightBold">
                {`${translate('currentDebt')}:\u00A0\u00A0`}
              </Box>
            </Typography>
            <Typography variant="subtitle2">
              <Box>{`$ ${parseFloat(row.debt).toFixed(2)}`}</Box>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={3} sm={3}>
          <Box pt={3} px={2} display="flex" justifyContent="flex-end">
            <CliCollapsePagination
              clientId={row.id}
              page={page}
              setPage={setPage}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Box pt={3} />
        </Grid>
      </Grid>
    </CollapseContent>
  );
}
