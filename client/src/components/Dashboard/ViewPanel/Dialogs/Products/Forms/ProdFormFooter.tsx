import { useState, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
// global state
import { useAppDispatch } from '../../../../../../app/store';
import {
  fetchProducts,
  useProductsSelector,
  selectProduct,
} from '../../../../../../features/products/productsSlice';
import {
  createProduct,
  updateProduct,
  resetProductForm,
  useProductFormSelector,
} from '../../../../../../features/products/productFormSlice';
import { fetchProvidersDetail } from '../../../../../../features/providers_detail/providersDetailSlice';
// interface
import { Product, ProductForm } from '../../../../../../api/product.services';
// context
import { useSnackbar } from '../../../../../../context/SnackbarContext';
import { useCollapsed } from '../../../common/context/CollapsedContext';
import { useLanguage } from '../../../../../../context/LanguageContext';
// components
import { FormFooter } from '../../../common/Forms';

interface ProdFormFooterProps {
  handleClose: () => void;
  openDialog: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHelperText: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProdFormFooter({
  handleClose,
  openDialog,
  setError,
  setHelperText,
}: ProdFormFooterProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const {
    dispatch: { setSnackbar, errorSnackbar },
  } = useSnackbar();

  const { product } = useProductsSelector((state) => state.products);

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const { setCollapsed } = useCollapsed();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validateInput = (productForm: ProductForm) => {
    if (productForm.provider_details.length > 0) {
      let someIsEmpty = productForm.provider_details.find(
        (row) => row.provider_id === '' || row.purchase_price === ''
      );
      if (
        productForm.name.length >= 2 &&
        productForm.sale_price.toString().length >= 1 &&
        !someIsEmpty
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    } else {
      if (
        productForm.name.length >= 2 &&
        productForm.sale_price.toString().length >= 1
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  };

  useEffect(() => {
    validateInput(productForm);
  }, [productForm]);

  const handleSubmit = () => {
    if (product) {
      handleUpdateProduct(product, productForm);
    } else {
      handleCreateProduct(productForm);
    }
  };

  const handleCreateProduct = (productData: ProductForm) => {
    const productName: string = productData.name;
    dispatch(
      createProduct({
        ...productData,
        stock: productData.stock ? productData.stock : 0,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('product')} "${productName}" ${translate(
            'successCreated'
          )}`
        );
        dispatch(resetProductForm());
        dispatch(fetchProducts());
        dispatch(fetchProvidersDetail());
        dispatch(selectProduct(null));
        setCollapsed('');
        handleClose();
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  const handleUpdateProduct = (
    selectedProduct: Product,
    prodToUpdateData: ProductForm
  ) => {
    let productData = {
      ...prodToUpdateData,
      stock: prodToUpdateData.stock ? prodToUpdateData.stock : 0,
    };
    const productId: number = selectedProduct.id;
    const productName: string = productData.name;
    dispatch(updateProduct({ productId, productData }))
      .then(unwrapResult)
      .then(() => {
        setSnackbar(
          true,
          `${translate('product')} "${productName}" ${translate(
            'successUpdated'
          )}`
        );
        dispatch(resetProductForm());
        dispatch(fetchProducts());
        dispatch(fetchProvidersDetail());
        dispatch(selectProduct(null));
        setCollapsed('');
      })
      .catch((err) => {
        setError(true);
        setHelperText(err.message);
        errorSnackbar();
        throw err;
      });
  };

  return (
    <FormFooter
      handleSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
      openDialog={openDialog}
      isUpdate={product ? true : false}
    />
  );
}
