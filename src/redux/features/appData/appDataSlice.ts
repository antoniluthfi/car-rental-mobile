import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICities, IRegisterVerificationMethod } from 'types/global.types';
import { RootState } from '../../store';
import { getAllCities } from './appDataAPI';

interface IInitState {
  status: string;
  cities: ICities[];
  isLoading: boolean;
  userData: {
    fullname: string;
    email: string;
    phone: string;
    code: string;
    wa: string;
    password: string;
    password_confirmation: string;
    registration_type: IRegisterVerificationMethod;
  }
}

const initialState: IInitState = {
  status: '',
  cities: [],
  isLoading: false,
  userData: {
    fullname: '',
    email: '',
    phone: '',
    code: '',
    wa: '',
    password: '',
    password_confirmation: '',
    registration_type: 'email'
  }
};

export const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    saveFormRegister: (state, action) => {
      state.userData.code = action.payload?.code;
      state.userData.email = action.payload?.email;
      state.userData.fullname = action.payload?.fullname;
      state.userData.phone = action.payload?.phone;
      state.userData.wa = action.payload?.wa;
      state.userData.password = action.payload?.password;
      state.userData.password_confirmation = action.payload?.password_confirmation;
      state.userData.registration_type = action.payload?.registration_type;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCities.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getAllCities.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload)
        state.cities = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })
      ;
  },
});

export const { saveFormRegister } = appDataSlice.actions;

export const appDataState = (state: RootState) => state.appData;
export default appDataSlice.reducer;
