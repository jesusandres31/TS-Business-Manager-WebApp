import React from 'react';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
// context
import { useLanguage } from '../../../../../../../../context/LanguageContext';
// components
import { MenuButton } from '../../../../../common/Table/Header/Buttons';
// child components
import ArticlesToDistributeDialog from './Dialogs/ArticlesToDistributeDialog';

export default function MenuRepButton() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const {
    dispatch: { translate },
  } = useLanguage();

  return (
    <MenuButton setOpenDialog={setOpenDialog}>
      <GetAppIcon fontSize="small" />

      <Typography variant="inherit">
        {translate('getArticlesToDistribute')}
      </Typography>

      <ArticlesToDistributeDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </MenuButton>
  );
}
