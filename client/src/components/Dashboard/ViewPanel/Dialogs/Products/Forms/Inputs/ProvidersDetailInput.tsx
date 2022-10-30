import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
// global state
import { useProductFormSelector } from '../../../../../../../features/products/productFormSlice';
// interface
import { ProviderDetailForm } from '../../../../../../../api/providerDetail.services';
// components
import { StyledGrid } from '../../../../common/Forms';
// children components
import AddProviderButton from './details/AddProviderButton';
import CreateANewProviderButton from './details/CreateANewProviderButton';
import ProvidersInput from './details/ProvidersInput';
import PurchasePriceInput from './details/PurchasePriceInput';

export default function ProvidersDetailInput() {
  const { productForm } = useProductFormSelector((state) => state.productForm);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const validateInput = (providerDetal: ProviderDetailForm[]) => {
    if (providerDetal.length === 0) {
      setButtonDisabled(false);
    } else {
      let someIsEmpty = providerDetal.find((row) => row.provider_id === '');
      if (someIsEmpty) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }
  };

  useEffect(() => {
    validateInput(productForm.provider_details);
  }, [productForm]);

  return (
    <>
      {productForm.provider_details.map((row, index) => {
        return (
          <>
            <StyledGrid item xs={12} sm={6}>
              <Box pt={1}>
                <ProvidersInput index={index} />
              </Box>
            </StyledGrid>

            <StyledGrid item xs={12} sm={6}>
              <PurchasePriceInput index={index} />
            </StyledGrid>
          </>
        );
      })}

      <StyledGrid item xs={12} sm={12}>
        {buttonDisabled ? (
          <CreateANewProviderButton />
        ) : (
          <AddProviderButton buttonDisabled={buttonDisabled} />
        )}
      </StyledGrid>
    </>
  );
}
