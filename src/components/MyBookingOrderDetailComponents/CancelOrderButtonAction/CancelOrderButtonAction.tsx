import Button from 'components/Button';
import CancelOrderModalContent from './CancelOrderModalContent';
import ModalSuccessCancelOrder from 'components/ModalSuccessCancelOrder/ModalSuccessCancelOrder';
import React, {useState} from 'react';
import {cancelOrder} from 'redux/features/order/orderAPI';
import {getOrders} from 'redux/features/myBooking/myBookingAPI';
import {showBSheet} from 'utils/BSheet';
import {showToast} from 'utils/Toast';
import {StyleSheet, View} from 'react-native';
import {theme} from 'utils';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch} from 'redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {WINDOW_WIDTH} from 'utils/mixins';

type CancelOrderButtonActionProps = {
  transactionKey: string;
};

const CancelOrderButtonAction: React.FC<CancelOrderButtonActionProps> = ({
  transactionKey,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const handleCancelOrder = () => {
    showBSheet({
      snapPoint: ['85%', '85%'],
      content: (
        <CancelOrderModalContent
          onSubmit={async val => {
            const res = await dispatch(
              cancelOrder({
                ...val,
                transaction_key: transactionKey,
              }),
            );
            console.log('res = ', res);
            if (res?.type.includes('fulfilled')) {
              setShowModalSuccess(true);
              return;
            }
            showToast({
              message: t('global.alert.cancellation_failed'),
              title: t('global.alert.error_occurred'),
              type: 'warning',
            });
          }}
        />
      ),
    });
  };

  return (
    <View>
      <Button
        _theme="red"
        title={t('global.button.cancelOrder')}
        onPress={handleCancelOrder}
        styleWrapper={{
          marginBottom: 10,
        }}
      />

      <ModalSuccessCancelOrder
        visible={showModalSuccess}
        setVisible={setShowModalSuccess}
        onFinish={() => {
          dispatch(toggleBSheet(false));
          navigation.goBack();
          dispatch(getOrders());
        }}
      />
    </View>
  );
};

export default CancelOrderButtonAction;

const styles = StyleSheet.create({
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey6,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
