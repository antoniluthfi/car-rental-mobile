import store from 'redux/store';
import {ReactNode} from 'react';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';

interface IToast {
  content: ReactNode;
  /**
   * value should be in percentage
   */
  snapPoint?: [string, string];
}

export const showBSheet = ({content, snapPoint}: IToast) => {
  const dispatch = store.dispatch;
  const showBsheet = store.getState().utils.isShowBSHeet;
  dispatch(
    toggleBSheet({
      content,
      snapPoint,
      show: !showBsheet,
    }),
  );
};
