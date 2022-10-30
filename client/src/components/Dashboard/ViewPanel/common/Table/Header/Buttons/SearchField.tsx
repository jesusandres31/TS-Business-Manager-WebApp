import React, { ChangeEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// context
import { useFilter } from '../../../context/FilterContext';
import { useCollapsed } from '../../../context/CollapsedContext';
// hooks
import { useComeBackToFirstPage } from '../../../hooks/useComeBackToFirstPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      minWidth: '20px',
    },
    /* space: {
      width: 1000,
    }, */
    root: {
      margin: theme.spacing(1),
      maxWidth: 1100,
    },
  })
);

export default function SearchField() {
  const classes = useStyles();

  const { comeBackToFirstPage } = useComeBackToFirstPage();

  const { filter, setFilter } = useFilter();

  const { setCollapsed } = useCollapsed();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
    comeBackToFirstPage();
  };

  const handleClick = () => {
    setFilter('');
    setCollapsed('');
    comeBackToFirstPage();
  };

  return (
    <>
      <FormControl
        fullWidth
        className={classes.root}
        variant="outlined"
        size="small"
      >
        <OutlinedInput
          value={filter}
          onChange={handleSearchChange}
          labelWidth={0}
          startAdornment={
            <InputAdornment position="start">
              <ListItemIcon className={classes.icon}>
                <SearchIcon />
              </ListItemIcon>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClick}
                edge="end"
              >
                <ListItemIcon className={classes.icon}>
                  <ClearIcon />
                </ListItemIcon>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}
