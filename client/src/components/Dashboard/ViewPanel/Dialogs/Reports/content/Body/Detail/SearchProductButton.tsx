import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// child components
import SelectProductDialog from './Dialog/SelectProductDialog';

interface SearchProductButtonProps {
  searchProductDialog: boolean;
  setSearchProductDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchProductButton({
  searchProductDialog,
  setSearchProductDialog,
}: SearchProductButtonProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const handleClick = () => {
    setSearchProductDialog(true);
  };

  return (
    <>
      <Box px={1}>
        <Tooltip title={translate('search')} arrow placement="bottom-end">
          <span>
            <Button variant="outlined" size="small" onClick={handleClick}>
              <IconButton aria-label="search" size="small">
                <FindInPageRoundedIcon color="primary" />
              </IconButton>
            </Button>
          </span>
        </Tooltip>
      </Box>
      <SelectProductDialog
        searchProductDialog={searchProductDialog}
        setSearchProductDialog={setSearchProductDialog}
      />
    </>
  );
}
