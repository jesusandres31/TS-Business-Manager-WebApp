import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// context
import { useCollapsed } from '../../../../../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../../../../../context/LanguageContext';
// interface
import { ProviderDetail } from '../../../../../../../../../../api/providerDetail.services';
import { Product } from '../../../../../../../../../../api/product.services';
// hooks
import { useProviderDetail } from '../../../../../../../../../../hooks/useProviderDetail';
// components
import { CollapseContent } from '../../../../../../../common/Table/Body/content/TableContent/Collapse';

interface CollapseColumn {
  id: 'id' | 'product_id' | 'provider_id' | 'purchase_price';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left';
}

const collapseColumns: CollapseColumn[] = [
  { id: 'provider_id', label: 'provider', minWidth: 100, align: 'right' },
  {
    id: 'purchase_price',
    label: 'purchasePrice',
    minWidth: 100,
    align: 'right',
  },
];

interface ProdCollapseContentProps {
  row: Product;
}

export default function ProdCollapseContent({ row }: ProdCollapseContentProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { collapsed } = useCollapsed();

  const isCollapsed = (row: any) => collapsed === row.id;
  const isItemCollapsed = isCollapsed(row);

  const [loadedItems, setLoadedItems] = useState<boolean>(false);

  const [providerDetails, setProviderDetails] = useState<ProviderDetail[]>([]);

  const { getProductProviderDetails, indexProviderCompanyName } =
    useProviderDetail();

  const loadProviderDetails = (product: Product) => {
    const productId: number = product.id;
    const res = getProductProviderDetails(productId);
    setProviderDetails(res);
    setLoadedItems(true);
  };

  useEffect(() => {
    if (isItemCollapsed) {
      setLoadedItems(false);
      setProviderDetails([]);
      loadProviderDetails(row);
    }
  }, [collapsed]);

  return (
    <CollapseContent isItemCollapsed={isItemCollapsed}>
      {providerDetails.length === 0 && loadedItems ? (
        <Typography variant="subtitle2" style={{ paddingLeft: '30px' }}>
          <Box fontWeight="fontWeightBold">
            {translate('noRegisteredProvider')}
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
              {providerDetails.map((providerDet: ProviderDetail) => (
                <TableRow key={providerDet.id}>
                  {collapseColumns.map((collapseColumn) => {
                    let value: string | number = providerDet[collapseColumn.id];

                    // getting provider company_name
                    if (
                      collapseColumn.id === 'provider_id' &&
                      typeof value === 'number'
                    ) {
                      value = indexProviderCompanyName(value);
                    }

                    return (
                      <TableCell
                        key={collapseColumn.id}
                        align={collapseColumn.align}
                        style={{ minWidth: collapseColumn.minWidth }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid item xs={12} sm={12}>
            <Box pt={4} />
          </Grid>
        </>
      )}
    </CollapseContent>
  );
}
