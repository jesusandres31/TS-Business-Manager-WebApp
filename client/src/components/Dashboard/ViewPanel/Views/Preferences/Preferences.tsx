import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
// global state
import {
  fetchProfile,
  useProfileSelector,
} from '../../../../../features/profile/profileSlice';
// hooks
import { useRoles } from '../../../../../hooks/useRoles';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// components
import { SimpleTable } from '../../common/SimpleTable';
// children components
import LocalConfig from './content/LocalConfig';
import GlobalConfig from './content/GlobalConfig';
import ValueConfig from './content/ValueConfig';

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

export default function Preferences() {
  const classes = useStyles();

  const { checkRole } = useRoles();

  const { error } = useProfileSelector((state) => state.users);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <SimpleTable>
      <Box m={2}>
        <LocalConfig classes={classes} />
        {checkRole(['manager']) ? (
          <>
            <GlobalConfig classes={classes} />
            <ValueConfig classes={classes} />
          </>
        ) : (
          <></>
        )}
      </Box>
    </SimpleTable>
  );
}
