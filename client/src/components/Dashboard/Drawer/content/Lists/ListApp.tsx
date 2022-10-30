import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
// context
import { View, useView } from '../../../context/ViewContext';
import { useLanguage } from '../../../../../context/LanguageContext';
// hooks
import { useRoles } from '../../../../../hooks/useRoles';
// content
import StyledListItem from '../StyledListItem';
import CustomListItem from '../CustomListItem';

interface ListAppProps {
  handleClick(view: View): void;
  classes: any;
}

export default function ListApp({ classes, handleClick }: ListAppProps) {
  const {
    dispatch: { translate },
  } = useLanguage();

  const { checkRole } = useRoles();

  const { view } = useView();

  const isView = (selectedView: any) => view === selectedView;

  const [openStat, setOpenStat] = React.useState(false);

  const handleClickStat = () => {
    setOpenStat(!openStat);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Box py={2}>
            <Typography variant="subtitle2">{translate('menu')}</Typography>
          </Box>
        </ListSubheader>
      }
      className={classes.root}
    >
      <StyledListItem
        isSelected={isView(View.Reports)}
        onClick={() => handleClick(View.Reports)}
      >
        <ListItemIcon className={classes.listItem}>
          <FileCopyOutlinedIcon fontSize="default" className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={translate('reports')} />
      </StyledListItem>

      <StyledListItem
        isSelected={isView(View.Products)}
        onClick={() => handleClick(View.Products)}
      >
        <ListItemIcon className={classes.listItem}>
          <LocalGroceryStoreOutlinedIcon
            fontSize="default"
            className={classes.icon}
          />
        </ListItemIcon>
        <ListItemText primary={translate('products')} />
      </StyledListItem>

      <StyledListItem
        isSelected={isView(View.Clients)}
        onClick={() => handleClick(View.Clients)}
      >
        <ListItemIcon className={classes.listItem}>
          <PeopleAltOutlinedIcon fontSize="default" className={classes.icon} />
        </ListItemIcon>
        <ListItemText primary={translate('clients')} />
      </StyledListItem>

      <StyledListItem
        isSelected={isView(View.Providers)}
        onClick={() => handleClick(View.Providers)}
      >
        <ListItemIcon className={classes.listItem}>
          <LocalShippingOutlinedIcon
            fontSize="default"
            className={classes.icon}
          />
        </ListItemIcon>
        <ListItemText primary={translate('providers')} />
      </StyledListItem>

      {checkRole(['manager', 'admin', 'supervisor']) ? (
        <StyledListItem
          isSelected={view.includes('STAT_')}
          onClick={handleClickStat}
        >
          <ListItemIcon className={classes.listItem}>
            <DonutLargeOutlinedIcon
              fontSize="default"
              className={classes.icon}
            />
          </ListItemIcon>
          <ListItemText primary={translate('statistics')} />
          {openStat ? <ExpandLess /> : <ExpandMore />}
        </StyledListItem>
      ) : (
        <></>
      )}
      <Collapse in={openStat} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <CustomListItem
            isSelected={false}
            onClick={() => handleClick(View.StatProducts)}
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
            onClick={() => handleClick(View.StatClients)}
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
            onClick={() => handleClick(View.StatProviders)}
          >
            <ListItemIcon className={classes.listItem}>
              <LocalShippingOutlinedIcon
                fontSize="small"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText secondary={translate('providers')} />
          </CustomListItem>

          <CustomListItem
            isSelected={false}
            onClick={() => handleClick(View.StatProfits)}
          >
            <ListItemIcon className={classes.listItem}>
              <AttachMoneyRoundedIcon
                fontSize="small"
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText secondary={translate('profits')} />
          </CustomListItem>
        </List>
      </Collapse>
    </List>
  );
}
