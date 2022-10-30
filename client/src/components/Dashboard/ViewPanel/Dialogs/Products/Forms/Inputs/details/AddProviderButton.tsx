import React from 'react';
import { Button, Typography, Tooltip } from '@material-ui/core';
// global state
import { useAppDispatch } from '../../../../../../../../app/store';
import {
  useProductFormSelector,
  updateProductForm,
  providerDetailsState,
} from '../../../../../../../../features/products/productFormSlice';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';

interface AddProviderButtonProps {
  buttonDisabled: boolean;
}

export default function AddProviderButton({
  buttonDisabled,
}: AddProviderButtonProps) {
  const dispatch = useAppDispatch();

  const {
    dispatch: { translate },
  } = useLanguage();

  const { productForm } = useProductFormSelector((state) => state.productForm);

  const handleClick = () => {
    dispatch(
      updateProductForm({
        ...productForm,
        provider_details: [
          ...productForm.provider_details,
          providerDetailsState,
        ],
      })
    );
  };

  return (
    <Tooltip
      title={buttonDisabled ? translate('completeTheFields') : ''}
      arrow
      placement="bottom"
    >
      <span>
        <Button
          size="small"
          color="primary"
          onClick={handleClick}
          disabled={buttonDisabled}
        >
          <Typography variant="subtitle2">{`${translate('add')} ${translate(
            'provider'
          )}`}</Typography>
        </Button>
      </span>
    </Tooltip>
  );
}
