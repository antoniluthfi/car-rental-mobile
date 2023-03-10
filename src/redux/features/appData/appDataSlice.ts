import {createSlice} from '@reduxjs/toolkit';
import {getAllCities, getGarages, getPayments, getUser} from './appDataAPI';
import {
  ICities,
  IFormDaily,
  IGarages,
  IPayments,
  IUserData,
  IUserProfile,
} from 'types/global.types';
import {RootState} from '../../store';

interface IInitState {
  status: string;
  cities: ICities[];
  searchHistory?: ICities;
  isLoading: boolean;
  userData: IUserData;
  userProfile: IUserProfile;
  formDaily: IFormDaily;
  garages: IGarages[];
  payments: IPayments[];
  languages: 'id' | 'en';
}

const initialState: IInitState = {
  status: '',
  cities: [],
  searchHistory: undefined,
  isLoading: false,
  userData: {
    fullname: '',
    email: '',
    phone: '',
    code: '',
    wa: '',
    password: '',
    password_confirmation: '',
    registration_type: 'email',
  },
  formDaily: {
    limit: 10,
    passanger: 4,
    price_sort: 'asc',
    start_trip: '',
    end_trip: '',
    location: '',
    page: 1,
    vehicle_id: 0,
    end_booking_date: '',
    end_booking_time: '',
    start_booking_date: '',
    start_booking_time: '',
    brand: 0,
  },
  userProfile: {
    email: '',
    id: '',
    name: '',
    personal_info: {
      ktp: '',
      sim: '',
    },
    phone: '',
    phone_code: '',
    wa_number: '',
    photo_profile: '',
  },
  garages: [],
  payments: [],
  languages: 'id',
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
      state.userData.password_confirmation =
        action.payload?.password_confirmation;
      state.userData.registration_type = action.payload?.registration_type;
    },
    saveFormDaily: (state, action) => {
      state.formDaily = action.payload;
    },
    toggleLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setSearchHistory: (state, action) => {
      state.searchHistory = action.payload;
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
        state.cities = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllCities.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      //GET USER
      .addCase(getUser.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userProfile = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      //GET GARAGES
      .addCase(getGarages.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getGarages.fulfilled, (state, action) => {
        state.status = 'idle';
        state.garages = action.payload;
        state.isLoading = false;
      })
      .addCase(getGarages.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      })

      .addCase(getPayments.pending, state => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(getPayments.fulfilled, (state, action) => {
        state.status = 'idle';
        state.payments = action.payload;
        state.isLoading = false;
      })
      .addCase(getPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
      });
  },
});

export const {
  saveFormRegister,
  saveFormDaily,
  toggleLanguages,
  setSearchHistory,
} = appDataSlice.actions;

export const appDataState = (state: RootState) => state.appData;
export default appDataSlice.reducer;
