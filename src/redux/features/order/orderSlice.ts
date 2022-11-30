import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICities, IFormDaily, IRegisterVerificationMethod } from 'types/global.types';
import { IDisbursements, IOrder, IOrderSummary } from 'types/order';
import { IBrands, IPaginationVehicle, IVehicles } from 'types/vehicles';
import { RootState } from '../../store';
import { createDisbursements, createOrder, getSummaryOrder } from './orderAPI';

interface IInitState {
  status: string;
  isLoading: boolean;
  summaryOrder: IOrderSummary;
  order: IOrder;
  disbursements: IDisbursements;
}

const initialState: IInitState = {
  status: '',
  isLoading: false,
  summaryOrder: {
    booking_price: 0,
    end_booking_date: '',
    end_booking_time: '',
    insurance_fee: 0,
    order_type_id: 0,
    rental_delivery_fee: 0,
    service_fee: 0,
    start_booking_date: '',
    start_booking_time: '',
    total_payment: 0,
    vehicle_id: 0,
  },
  order: {
    booking_price: 0,
    insurance_fee: 0,
    order_type_id: 0,
    rental_delivery_fee: 0,
    service_fee: 0,
    total_payment: 0,
    customer_id: '',
    email: '',
    expired_time: '',
    id: 0,
    order_detail: {
      end_booking_date: '',
      end_booking_time: '',
      is_take_from_rental_office: false,
      passenger_number: 0,
      rental_delivery_location: '',
      rental_return_office_id: 0,
      start_booking_date: '',
      start_booking_time: '',
      vehicle_id: 0,
      special_request: ''
    },
    order_status: 'FAILED',
    phone_number: '',
    transaction_key: '',
    updated_at: '',
    user_name: '',
    wa_number: ''
  },
  disbursements: {
    transaction_id: '',
    transaction_key: '',
    va_numbers: []
  }
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      
      // vehicles
      .addCase(getSummaryOrder.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getSummaryOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.summaryOrder = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getSummaryOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      //CREATE ORDER
      .addCase(createOrder.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('action order = ', action.payload)
        state.order = action.payload.data.order || [];
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

       //CREATE disbursements
       .addCase(createDisbursements.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createDisbursements.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.disbursements = action.payload?.data?.disbursement || [];
        state.isLoading = false;
      })
      .addCase(createDisbursements.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      ;
  },
});

export const { } = orderSlice.actions;

export const orderState = (state: RootState) => state.order;
export default orderSlice.reducer;
