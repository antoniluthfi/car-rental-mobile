import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICities, IFormDaily, IRegisterVerificationMethod } from 'types/global.types';
import { IBrands, IPaginationVehicle, IVehicles } from 'types/vehicles';
import { RootState } from '../../store';
import { getBrands, getVehicles, getVehiclesById } from './vehiclesAPI';

interface IInitState {
  status: string;
  isLoading: boolean;
  vehicles: IVehicles[];
  paginationVehicles: IPaginationVehicle | any;
  brands: IBrands[];
  vehicleById: IVehicles;
}

const initialState: IInitState = {
  status: '',
  isLoading: false,
  vehicles: [],
  paginationVehicles: {},
  brands: [],
  vehicleById: {
    brand_name: '',
    disablility_allowed: false,
    id: 0,
    license_number: '',
    max_passanger: 0,
    max_suitcase: 0,
    name: '',
    pet_allowed: false,
    photo: [],
    price: 0,
    smoke_allowed: false,
    status: '',
    year: 1999
  },
};

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      
      // vehicles
      .addCase(getVehicles.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
        state.vehicles = [];
        state.paginationVehicles = {};
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.vehicles = action.payload.vehicles || [];
        state.paginationVehicles = action.payload.paginationVehicles || {};
        state.isLoading = false;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      // vehicle Detail
      .addCase(getVehiclesById.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
        // state.vehicleById = {};
      })
      .addCase(getVehiclesById.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.vehicleById = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getVehiclesById.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      // brands
      .addCase(getBrands.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
        state.brands = [];
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.brands = action.payload || [];
        state.isLoading = false;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      ;
  },
});

export const { } = vehiclesSlice.actions;

export const vehiclesState = (state: RootState) => state.vehicles;
export default vehiclesSlice.reducer;
