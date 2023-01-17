import { ReactNode } from "react";
import { useDispatch } from "react-redux"
import { toggleBSheet, toggleToast } from "redux/features/utils/utilsSlice";
import store from "redux/store";

interface IToast {
    content:ReactNode;
    height?: 'half' | 'full' | 'both';
}
export const showBSheet = ({
    content,
    height
}: IToast) => {
    const dispatch = store.dispatch;
    const showBsheet = store.getState().utils.isShowBSHeet;
    dispatch(toggleBSheet({
        content,
        height: height,
        show: !showBsheet
    }));
}