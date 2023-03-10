import i18n from 'i18next';
import {apiWithInterceptor} from '../../../utils/interceptorV2';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponApi} from 'types/global.types';
import {IResponVehicles} from 'types/vehicles';
import {showToast} from 'utils/Toast';

export const getVehicles = createAsyncThunk(
  'appData/getVehicles',
  async function (
    params: string,
    thunkAPI,
  ): Promise<IResponApi<IResponVehicles> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/vehicles${params}`,
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message:
          error?.response.data?.slug || i18n.t('global.alert.error_occurred'),
        title: i18n.t('global.alert.warning'),
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getBrands = createAsyncThunk(
  'appData/getBrands',
  async function (params, thunkAPI): Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: '/api/brands',
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message:
          error?.response.data?.slug || i18n.t('global.alert.error_occurred'),
        title: i18n.t('global.alert.warning'),
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getVehiclesById = createAsyncThunk(
  'appData/getVehiclesById',
  async function (params: number, thunkAPI): Promise<IResponApi<any> | any> {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/vehicles/${params}`,
      });

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      showToast({
        message:
          error?.response.data?.slug || i18n.t('global.alert.error_occurred'),
        title: i18n.t('global.alert.warning'),
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
