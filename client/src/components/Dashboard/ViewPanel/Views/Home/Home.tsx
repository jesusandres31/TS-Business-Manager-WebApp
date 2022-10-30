import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// global state
import {
  fetchProfile,
  useProfileSelector,
} from '../../../../../features/profile/profileSlice';
import { fetchMyUser } from '../../../../../features/settings/settingsSlice';
import { fetchClients } from '../../../../../features/clients/clientsSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// components
import { SimpleTable } from '../../common/SimpleTable';
// children components
import MainContent from './content/MainContent';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  typography: {
    display: 'inline-block',
    paddingLeft: '10px',
  },
}));

export default function Home() {
  const classes = useStyles();

  const { error } = useProfileSelector((state) => state.users);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyUser());
    // anticipated loading for Report view ?¿
    dispatch(fetchClients());
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <SimpleTable>
      <Box m={2}>
        <MainContent classes={classes} />
      </Box>
    </SimpleTable>
  );
}
