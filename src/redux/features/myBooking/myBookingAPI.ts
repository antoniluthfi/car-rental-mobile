import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiResponse} from 'apisauce';
import {IResponApi} from 'types/global.types';
import {IMyBookingResult, IParamVehicleOrder} from 'types/my-booking.types';
import {apiWithInterceptor} from 'utils/interceptor';
import {showToast} from 'utils/Toast';

export const getOrders = createAsyncThunk(
  'booking/getOrders',
  async (_, thunkAPI: any): Promise<IResponApi<IMyBookingResult>> => {
    try {
      const currentPage = thunkAPI.getState().myBooking.page;
      const currentData = thunkAPI.getState().myBooking.data.data;

      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/orders/my-booking?page=${currentPage}&limit=10&order_by=created_at&order_seq=DESC`,
      );

      if (!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data) as any;
      }

      if (currentPage > 1) {
        return {
          ...response.data,
          data: [...currentData, ...(response.data?.data || [])],
        };
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getOrderById = createAsyncThunk(
  'booking/getOrderById',
  async (id: string, thunkAPI: any): Promise<IResponApi<any>> => {
    try {
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/orders/${id}`,
      );

      if (!response.ok) {
        showToast({
          message: 'Terjadi kesalahan',
          title: 'Warning',
          type: 'error',
        });
        return thunkAPI.rejectWithValue(response.data) as any;
      }

      return response.data;
    } catch (error: any) {
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
      const response: ApiResponse<any> = await apiWithInterceptor.get(
        `/api/vehicles/${id}`,
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
