import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import { useProfileSelector } from '../../../../../../features/profile/profileSlice';
import { useProductsSelector } from '../../../../../../features/products/productsSlice';
import {
  fetchProductById,
  updateProductForm,
  useProductFormSelector,
} from '../../../../../../features/products/productFormSlice';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
// interface
import { Product } from '../../../../../../api/product.services';
// components
import { FormBody, StyledGrid } from '../../../common/Forms';
// children components
import NameInput from './Inputs/NameInput';
import StockInput from './Inputs/StockInput';
/* import MinStockInput from './Inputs/MinStockInput'; */
import ProductTypeInput from './Inputs/ProductTypeInput';
import SalePriceInput from './Inputs/SalePriceInput';
import ProvidersDetailInput from './Inputs/ProvidersDetailInput';

interface ProdFormBodyProps {
  openDialog: boolean;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  helperText: string;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProdFormBody({
  openDialog,
  error,
  setError,
  helperText,
  setHelperText,
}: ProdFormBodyProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { errorSnackbar },
  } = useSnackbar();

  const { profile } = useProfileSelector((state) => state.profile);

  const { product } = useProductsSelector((state) => state.products);

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const handleFetchProductById = (product: Product) => {
    const productId: number = product.id;
    dispatch(fetchProductById(productId))
      .then(unwrapResult)
      .then((payload) => {
        dispatch(
          updateProductForm({
            ...product,
            name: payload.name,
            product_type_id: payload.product_type_id,
            stock: payload.stock,
            sale_price: payload.sale_price,
            min_stock: payload.min_stock,
            provider_details: payload.provider_details,
          })
        );
      })
      .catch((err) => {
        errorSnackbar();
        throw err;
      });
  };

  useEffect(() => {
    if (product && openDialog) {
      handleFetchProductById(product);
    }
    if (!product && openDialog) {
      dispatch(
        updateProductForm({
          ...productForm,
          product_type_id: profile.product_type_id,
        })
      );
    }
  }, [openDialog]);

  return (
    <FormBody>
      <>
        <StyledGrid item xs={12} sm={6}>
          <NameInput
            error={error}
            setError={setError}
            helperText={helperText}
            setHelperText={setHelperText}
          />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <ProductTypeInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <StockInput />
        </StyledGrid>

        <StyledGrid item xs={12} sm={6}>
          <SalePriceInput />
        </StyledGrid>

        <ProvidersDetailInput />
      </>
    </FormBody>
  );
}
