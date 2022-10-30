import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import {
  IClientsByInvoices,
  IProductsSoldByClient,
  ITotalSoldToClients,
  IProductsByProviders,
  ITotalSoldByProviders,
  IProductsSoldByProvider,
  IProductsByInvoice,
  IClientsPurchasesByProduct,
  IProfits,
} from '../../api/statistic.services';
import { IDate } from '../../interfaces';
import * as statisticSvcs from '../../api/statistic.services';

// Interfaces
interface StatisticsState {
  loading: boolean;
  error: boolean | string;
}

// Initial state
const initialState: StatisticsState = {
  loading: false,
  error: false,
};

// Asynchronous thunk actions
/**
 * CLIENTS STATS #######################################################
 */
export const fetchClientsByInvoices = createAsyncThunk(
  'statistics/fetchClientsByInvoices',
  async (date: IDate) => {
    const data: IClientsByInvoices[] =
      await statisticSvcs.fetchClientsByInvoices(date);
    return data;
  }
);

export const fetchProductsSoldByClient = createAsyncThunk(
  'statistics/fetchProductsSoldByClient',
  async ({ clientId, date }: { clientId: number; date: IDate }) => {
    const data: IProductsSoldByClient[] =
      await statisticSvcs.fetchProductsSoldByClient(clientId, date);
    return data;
  }
);

export const fetchTotalSoldToClients = createAsyncThunk(
  'statistics/fetchTotalSoldToClients',
  async (date: IDate) => {
    const data: ITotalSoldToClients[] =
      await statisticSvcs.fetchTotalSoldToClients(date);
    return data;
  }
);

/**
 * PROVIDERS STATS #######################################################
 */
export const fetchProductsByProviders = createAsyncThunk(
  'statistics/fetchProductsByProviders',
  async () => {
    const data: IProductsByProviders[] =
      await statisticSvcs.fetchProductsByProviders();
    return data;
  }
);

export const fetchTotalSoldByProviders = createAsyncThunk(
  'statistics/fetchTotalSoldByProviders',
  async (date: IDate) => {
    const data: ITotalSoldByProviders[] =
      await statisticSvcs.fetchTotalSoldByProviders(date);
    return data;
  }
);

export const fetchProductsSoldByProvider = createAsyncThunk(
  'statistics/fetchProductsSoldByProvider',
  async ({ providerId, date }: { providerId: number; date: IDate }) => {
    const data: IProductsSoldByProvider[] =
      await statisticSvcs.fetchProductsSoldByProvider(providerId, date);
    return data;
  }
);

/**
 * PRODUCTS STATS #######################################################
 */
export const fetchProductsByInvoice = createAsyncThunk(
  'statistics/fetchProductsByInvoice',
  async (date: IDate) => {
    const data: IProductsByInvoice[] =
      await statisticSvcs.fetchProductsByInvoice(date);
    return data;
  }
);

export const fetchClientsPurchasesByProduct = createAsyncThunk(
  'statistics/fetchClientsPurchasesByProduct',
  async ({ productId, date }: { productId: number; date: IDate }) => {
    const data: IClientsPurchasesByProduct[] =
      await statisticSvcs.fetchClientsPurchasesByProduct(productId, date);
    return data;
  }
);

/**
 * PROFITS STATS #######################################################
 */

export const fetchGrossProfits = createAsyncThunk(
  'statistics/fetchGrossProfits',
  async (date: IDate) => {
    const data: IProfits = await statisticSvcs.fetchGrossProfits(date);
    return data;
  }
);

export const fetchTotalDebts = createAsyncThunk(
  'statistics/fetchTotalDebts',
  async () => {
    const data: IProfits = await statisticSvcs.fetchTotalDebts();
    return data;
  }
);

// Slice
const statistics = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// Selector
export const useStatisticsSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// Reducer
export default statistics.reducer;
