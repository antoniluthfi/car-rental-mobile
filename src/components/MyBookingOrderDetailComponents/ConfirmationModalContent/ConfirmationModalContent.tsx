import {ic_confirmation} from 'assets/icons';
import Button from 'components/Button';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, Image, StyleSheet} from 'react-native';
import {iconCustomSize, WINDOW_WIDTH} from 'utils/mixins';

type ConfirmationModalContentProps = {
  status: 'extend_order' | 'cancel_order' | 'close';
  onPress: () => void;
  onClose: () => void;
};

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  status,
  onPress,
  onClose,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.bsheetWrapper}>
      <Image
        source={ic_confirmation}
        style={iconCustomSize(200)}
        resizeMode={'contain'}
      />
      <Text>
        {t('myBooking.are_you_sure_want_to_continue')}{' '}
        {status === 'extend_order'
          ? `${t('myBooking.this_payment')}?`
          : `${t('myBooking.cancel_this_order')}?`}
      </Text>
      <View style={{width: '95%', margin: 16}}>
        <Button
          _theme="navy"
          title={t('global.button.yesNext')}
          onPress={onPress}
          styleWrapper={{marginBottom: 20}}
        />
        <Button
          _theme="white"
          title={t('global.button.back')}
          onPress={onClose}
        />
      </View>
    </View>
  );
};

export default ConfirmationModalContent;

const styles = StyleSheet.create({
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
});
