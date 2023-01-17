import { createSlice } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from "redux/store";

interface IInit {
    isShowLoader: boolean;
    isShowToast: boolean;
    titleToast: string;
    messageToast: string;
    isShowBSHeet: boolean;
    contentBsheet ? :ReactNode;
    typeToast: 'success' | 'warning' | 'error';
    snapPoint?: [string, string];
}
const initialState: IInit = {
    isShowLoader: false,
    isShowToast: false,
    titleToast: '',
    messageToast: '',
    typeToast: 'success',
    isShowBSHeet: false,
    contentBsheet: undefined,
<<<<<<< HEAD
    height: "full",
=======
    snapPoint: undefined
>>>>>>> 5800bace9a6274231cfa40a6e758935c7abfb889
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
        toggleBSheet: (state, action)=> {
            state.isShowBSHeet = action.payload.show;
            state.contentBsheet = action.payload.content;
<<<<<<< HEAD
            state.height = action.payload.height || 'full';
=======
            state.snapPoint = action.payload.snapPoint;
>>>>>>> 5800bace9a6274231cfa40a6e758935c7abfb889
        }
    },
});

export const { toggleLoader, toggleToast, toggleBSheet } = utilsSlice.actions;

export const utilsState = (state: RootState) => state.utils;
export default utilsSlice.reducer;
