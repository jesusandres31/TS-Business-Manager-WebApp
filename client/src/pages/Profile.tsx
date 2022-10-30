import { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
// global state
import { fetchProfile } from '../features/profile/profileSlice';
import { fetchMyUser } from '../features/settings/settingsSlice';
// children components
import Main from '../components/Profile/Main';

export default function Profile() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchMyUser());
  }, [dispatch]);

  const renderProfile = () => {
    return <Main />;
  };

  return <>{renderProfile()}</>;
}
