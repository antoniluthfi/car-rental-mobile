import {createAsyncThunk} from '@reduxjs/toolkit';
import {IResponApi} from 'types/global.types';
import {IMyBookingResult, IParamVehicleOrder} from 'types/my-booking.types';
import {apiWithInterceptor} from 'utils/interceptorV2';
import {showToast} from 'utils/Toast';

export const getOrders = createAsyncThunk(
  'booking/getOrders',
  async (_, thunkAPI: any): Promise<IResponApi<IMyBookingResult>> => {
    try {
      const currentPage = thunkAPI.getState().myBooking.page;
      const currentData = thunkAPI.getState().myBooking.data.data;

      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/orders/my-booking?page=${currentPage}&limit=10&order_by=created_at&order_seq=DESC`,
      });

      if (currentPage > 1) {
        return {
          ...response.data,
          data: [...currentData, ...(response.data?.data || [])],
        };
      }

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOrderById = createAsyncThunk(
  'booking/getOrderById',
  async (id: string, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/orders/${id}`,
      });

      return response.data;
    } catch (error: any) {
      showToast({
        message: error?.response.data?.slug || 'Terjadi kesalahan',
        title: 'Warning',
        type: 'error',
      });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getVehicleOrder = createAsyncThunk(
  'booking/getVehicleById',
  async (
    payload: IParamVehicleOrder,
    thunkAPI: any,
  ): Promise<IResponApi<any>> => {
    const {id} = payload;

    try {
      const response: any = await apiWithInterceptor({
        method: 'get',
        url: `/api/vehicles/${id}`,
      });

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
