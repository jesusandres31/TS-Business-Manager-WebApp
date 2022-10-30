import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SettingsApplicationsOutlinedIcon from '@material-ui/icons/SettingsApplicationsOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// context
import { View, useView } from '../../../context/ViewContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useRoles } from '../../../../../hooks/useRoles';
// content
import StyledListItem from '../StyledListItem';
import CustomListItem from '../CustomListItem';

interface ListSetProps {
  handleClick(view: View): void;
  classes: any;
}

export default function ListSet({ classes, handleClick }: ListSetProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { checkRole } = useRoles();

  const { view } = useView();

  const isView = (selectedView: any) => view === selectedView;

  const [openBin, setOpenBin] = React.useState(false);

  const handleClickBin = () => {
    setOpenBin(!openBin);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Box py={2}>
            <Typography variant="subtitle2">
              {translate('advancedOptions')}
            </Typography>
          </Box>
        </ListSubheader>
      }
      className={classes.root}
    >
      <StyledListItem
        isSelected={isView(View.Preferences)}
        onClick={() => handleClick(View.Preferences)}
      >
        <ListItemIcon className={classes.listItem}>
          <SettingsApplicationsOutlinedIcon
            fontSize="default"
            className={classes.icon}
          />
        </ListItemIcon>
        <ListItemText primary={translate('preferences')} />
      </StyledListItem>

      {checkRole(['manager']) ? (
        <StyledListItem
          isSelected={isView(View.Users)}
          onClick={() => handleClick(View.Users)}
        >
          <ListItemIcon className={classes.listItem}>
            <AccountBoxOutlinedIcon
              fontSize="default"
              className={classes.icon}
            />
          </ListItemIcon>
          <ListItemText primary={translate('users')} />
        </StyledListItem>
      ) : (
        <></>
      )}

      {checkRole(['manager', 'admin']) ? (
        <StyledListItem
          isSelected={view.includes('BIN_')}
          onClick={handleClickBin}
        >
          <ListItemIcon className={classes.listItem}>
            <DeleteOutlinedIcon fontSize="default" className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={translate('recycleBin')} />
          {openBin ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem>
      ) : (
        <></>
      )}
      <Collapse in={openBin} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <CustomListItem
            isSelected={false}
            onClick={() => handleClick(View.BinProducts)}
          >
            <ListItemIcon className={classes.listItem}>
              <ShoppingCartOutlinedIcon
                fontSize="small"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText secondary={translate('products')} />
          </CustomListItem>

          <CustomListItem
            isSelected={false}
            onClick={() => handleClick(View.BinClinets)}
          >
            <ListItemIcon className={classes.listItem}>
              <PeopleAltOutlinedIcon
                fontSize="small"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText secondary={translate('clients')} />
          </CustomListItem>

          <CustomListItem
            isSelected={false}
            onClick={() => handleClick(View.BinProviders)}
          >
            <ListItemIcon className={classes.listItem}>
              <LocalShippingOutlinedIcon
                fontSize="small"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText secondary={translate('providers')} />
          </CustomListItem>

          {checkRole(['manager']) ? (
            <CustomListItem
              isSelected={false}
              onClick={() => handleClick(View.BinUsers)}
            >
              <ListItemIcon className={classes.listItem}>
                <AccountBoxOutlinedIcon
                  fontSize="small"
                  className={classes.icon}
                />
              </ListItemIcon>
              <ListItemText secondary={translate('users')} />
            </CustomListItem>
          ) : (
            <></>
          )}
        </List>
      </Collapse>
    </List>
  );
}
