import { ReactNode } from "react";
import { useDispatch } from "react-redux"
import { toggleBSheet, toggleToast } from "redux/features/utils/utilsSlice";
import { store } from "redux/store";

interface IToast {
    content:ReactNode;
}
export const showBSheet = ({
    content
}: IToast) => {
    const dispatch = store.dispatch;
    const showBsheet = store.getState().utils.isShowBSHeet;
    dispatch(toggleBSheet({
        content,
        show: !showBsheet
    }));
}