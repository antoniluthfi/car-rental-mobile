import {createSlice} from '@reduxjs/toolkit';
import {IOrder, IOrderSummary, IDisbursements} from 'types/order';
import {RootState} from '../../store';
import {
  createOrder,
  getSummaryOrder,
  postDisbursements,
  createDisbursements,
} from './orderAPI';

interface IInitState {
  status: string;
  isLoading: boolean;
  summaryOrder: IOrderSummary;
  order: IOrder;
  disbursements: IDisbursements;
  isDisbursementSuccess: boolean;
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
      special_request: '',
    },
    order_status: 'FAILED',
    phone_number: '',
    transaction_key: '',
    updated_at: '',
    user_name: '',
    wa_number: '',
  },
  disbursements: {
    transaction_id: '',
    transaction_key: '',
    va_numbers: [],
  },
  isDisbursementSuccess: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetDisbursementStatus: state => {
      return {
        ...state,
        isDisbursementSuccess: false,
      };
    },
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
        state.order = action.payload.data.order || [];
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      // post disbursements -> for manual transfer
      .addCase(postDisbursements.pending, state => {
        state.isLoading = true;
        state.isDisbursementSuccess = false;
      })
      .addCase(postDisbursements.rejected, (state, action) => {
        state.isLoading = false;
        state.disbursements = {} as any;
      })
      .addCase(postDisbursements.fulfilled, (state, action) => {
        state.isDisbursementSuccess = true;
        state.isLoading = false;
        state.disbursements = action.payload;
      })

      // CREATE disbursements -> for VA number
      .addCase(createDisbursements.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createDisbursements.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.disbursements = action.payload?.data?.disbursement || [];
        state.isLoading = false;
      })
      .addCase(createDisbursements.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      });
  },
});

export const { resetDisbursementStatus } = orderSlice.actions;

export const orderState = (state: RootState) => state.order;
export default orderSlice.reducer;
