import { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
// global state
import { checkAuth } from '../features/auth/authSlice';
import { useProfileSelector } from '../features/profile/profileSlice';
// children components
import MainLogin from '../components/Login/MainLogin';
// common
import { Loading } from '../common';

export default function Login() {
  const dispatch = useAppDispatch();

  const { loading } = useProfileSelector((state) => state.profile);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const renderLogin = () => {
    if (loading) return <Loading />;

    return <MainLogin />;
  };

  return <>{renderLogin()}</>;
}
