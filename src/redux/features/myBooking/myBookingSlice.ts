import {createSlice} from '@reduxjs/toolkit';
import {getOrderById, getOrders, getVehicleOrder} from './myBookingAPI';

interface IInitState {
  data: {
    data: any[];
    pagination: {
      limit: number;
      next_page: number;
      page: number;
      prev_page: number;
      total: number;
      total_page: number;
    };
  };
  vehicleData: any[];
  selected: any;
  isSelectedLoading: boolean;
  page: number;
  isLoading: boolean;
  isError: boolean;
  errorMessage: any;
}

const initialState: IInitState = {
  data: {
    data: [],
    pagination: {
      limit: 0,
      next_page: 0,
      page: 0,
      prev_page: 0,
      total: 0,
      total_page: 0,
    },
  },
  vehicleData: [],
  selected: {},
  isSelectedLoading: false,
  page: 1,
  isLoading: false,
  isError: false,
  errorMessage: '', // kalo retry setelah error, harus hapus errorMessage dan isError!
};

export const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // reducers goes here
    resetSelected: state => {
      return {
        ...state,
        isSelectedLoading: false,
        selected: {},
      };
    },
    setPage: (state, action) => {
      return {...state, page: action.payload};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as any;
      })
      .addCase(getOrderById.pending, state => {
        state.isSelectedLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isSelectedLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isSelectedLoading = false;
        state.selected = action.payload;
      })
      .addCase(getVehicleOrder.pending, state => {
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getVehicleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getVehicleOrder.fulfilled, (state, action: any) => {
        state.isLoading = false;

        const isFound = state.vehicleData.find(
          vehicle => vehicle.id == action.payload.id,
        );
        if (isFound) return;
        state.vehicleData = [...state.vehicleData, action.payload];
      });
  },
});

export const {resetSelected, setPage} = booking.actions;

export default booking.reducer;
