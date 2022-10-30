import { useEffect } from 'react';
import { useAppDispatch } from '../app/store';
// global state
import { fetchRoles } from '../features/extras/rolesSlice';
import { fetchProductTypes } from '../features/extras/productTypesSlice';
import { fetchPaymentTypes } from '../features/extras/paymentTypesSlice';
import { fetchSaleTypes } from '../features/extras/saleTypesSlice';
import { fetchLanguages } from '../features/extras/languagesSlice';
import { fetchUsers } from '../features/users/usersSlice';
import {
  useProfileSelector,
  fetchProfileToDashboard,
} from '../features/profile/profileSlice';
// child components
import Main from '../components/Dashboard/Main';
// common
import { Loading } from '../common';

export default function Dashboard(): JSX.Element {
  const dispatch = useAppDispatch();

  const { loadingDashboard } = useProfileSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileToDashboard());
    dispatch(fetchUsers());
    dispatch(fetchRoles());
    dispatch(fetchProductTypes());
    dispatch(fetchPaymentTypes());
    dispatch(fetchSaleTypes());
    dispatch(fetchLanguages());
  }, [dispatch]);

  const renderApp = () => {
    if (loadingDashboard) return <Loading />;

    return <Main />;
  };

  return <>{renderApp()}</>;
}
