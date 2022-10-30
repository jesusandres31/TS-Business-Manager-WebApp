import { combineReducers } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
// reducers
import { authReducer } from '../features/auth';
import { profileReducer, profileFormReducer } from '../features/profile';
import { settingsReducer, settingsFormReducer } from '../features/settings';
import { usersReducer, userFormReducer } from '../features/users';
import { productsReducer, productFormReducer } from '../features/products';
import { providersReducer, providerFormReducer } from '../features/providers';
import { clientsReducer, clientFormReducer } from '../features/clients';
import { providersDetailReducer } from '../features/providers_detail';
import { checkingAccountsReducer } from '../features/checking_accounts';
import {
  rolesReducer,
  productTypesReducer,
  paymentTypesReducer,
  saleTypesReducer,
  languagesReducer,
} from '../features/extras';
import {
  invoicesReducer,
  invoiceDetailReducer,
  invoiceFormReducer,
  invoiceDetailFormReducer,
} from '../features/invoices';
import { statisticsReducer } from '../features/statistics';

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  profileForm: profileFormReducer,
  settings: settingsReducer,
  settingsForm: settingsFormReducer,
  users: usersReducer,
  userForm: userFormReducer,
  products: productsReducer,
  productForm: productFormReducer,
  providers: providersReducer,
  providerForm: providerFormReducer,
  clients: clientsReducer,
  clientForm: clientFormReducer,
  providersDetail: providersDetailReducer,
  checkingAccounts: checkingAccountsReducer,
  roles: rolesReducer,
  productTypes: productTypesReducer,
  paymentTypes: paymentTypesReducer,
  saleTypes: saleTypesReducer,
  languages: languagesReducer,
  invoices: invoicesReducer,
  invoiceDetail: invoiceDetailReducer,
  invoiceForm: invoiceFormReducer,
  invoiceDetailForm: invoiceDetailFormReducer,
  statistics: statisticsReducer,
});

const rootReducer = (
  state: RootState | undefined,
  action: PayloadAction<any>
) => {
  // reset state after signout
  if (action.type.includes('auth/signOut/fulfilled')) {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;

export default rootReducer;
