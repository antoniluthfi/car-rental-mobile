import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { getInboxDetail, getInboxes } from './myInboxAPI';

type InitState = {
  data: any
  detail: any
  isLoading: boolean
  isError: boolean
  errorMessage: any
  page: number
}

const initialState: InitState = {
  data: {},
  detail: {},
  isLoading: false,
  isError: false,
  errorMessage: {}, // kalo retry setelah error, harus hapus errorMessage dan isError!
  page: 1,
};

export const inbox = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    // reducers goes here
    setPage: (state, action) => {
      return {...state, page: action.payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInboxes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = {};
      })
      .addCase(getInboxes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getInboxes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getInboxDetail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = {};
      })
      .addCase(getInboxDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getInboxDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detail = action.payload;
      });
  },
});

export const {setPage} = inbox.actions;
export const inboxState = (state: RootState) => state.inbox;
export default inbox.reducer;
