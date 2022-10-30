import { useEffect } from 'react';
import { useAppDispatch } from '../../../../../app/store';
// global state
import {
  fetchUsers,
  useUsersSelector,
  selectUser,
} from '../../../../../features/users/usersSlice';
import { fetchProfile } from '../../../../../features/profile/profileSlice';
// common
import { Error401 } from '../../../../../common';
// context
import { useView } from '../../../context/ViewContext';
// children components
import MainTable from './content/MainTable';
import MainProvider from '../../MainProvider';

export default function UsersView() {
  const { error } = useUsersSelector((state) => state.users);

  const { view } = useView();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchUsers());
    dispatch(selectUser(null));
  }, [view, dispatch]);

  if (error) return <Error401 />;

  return (
    <MainProvider>
      <MainTable />
    </MainProvider>
  );
}
