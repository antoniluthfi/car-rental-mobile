import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IRegisterVerificationMethod } from "types/global.types";

interface IInit {
    isShowLoader: boolean;
    isShowToast: boolean;
    titleToast: string;
    messageToast: string;
    typeToast: 'success' | 'warning' | 'error';
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
const initialState: IInit = {
    isShowLoader: false,
    isShowToast: false,
    titleToast: '',
    messageToast: '',
    typeToast: 'success',
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

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        toggleLoader: (state, action) => {
            state.isShowLoader = action.payload;
        },
        toggleToast: (state, action) => {
            state.isShowToast = action.payload.show;
            state.messageToast = action.payload.message;
            state.titleToast = action.payload.title;
            state.typeToast = action.payload.type;
        },
        saveFormRegister: (state, action) => {
            console.log(action.payload)
            state.userData.code = action.payload?.code;
            state.userData.email = action.payload?.email;
            state.userData.fullname = action.payload?.fullname;
            state.userData.phone = action.payload?.phone;
            state.userData.wa = action.payload?.wa;
            state.userData.password = action.payload?.password;
            state.userData.password_confirmation = action.payload?.password_confirmation;
            state.userData.registration_type = action.payload?.registration_type;
        }
    },
});

export const { toggleLoader, toggleToast, saveFormRegister } = utilsSlice.actions;

export const utilsState = (state: RootState) => state.utils;
export default utilsSlice.reducer;
