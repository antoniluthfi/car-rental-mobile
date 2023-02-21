import Button from 'components/Button';
import ConfirmationModalContent from '../ConfirmationModalContent/ConfirmationModalContent';
import React from 'react';
import {showBSheet} from 'utils/BSheet';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {WINDOW_WIDTH} from 'utils/mixins';

const ExtendOrderButtonAction: React.FC = () => {
  const {t} = useTranslation();

  const handleConfirmation = (
    status: 'extend_order' | 'close',
  ) => {
    showBSheet({
      content: (
        <ConfirmationModalContent
          status="extend_order"
          onPress={() => {
            handleConfirmation('close');
            if (status === 'extend_order') {
              handleExtendOrder();
              return;
            }
          }}
          onClose={() => handleConfirmation('close')}
        />
      ),
    });
  };

  const handleExtendOrder = () => {
    showBSheet({
      content: <View style={styles.bsheetWrapper}></View>,
    });
  };

  return (
    <View>
      <Button
        _theme="navy"
        title={t('global.button.extendOrder')}
        onPress={() => handleConfirmation('extend_order')}
      />
    </View>
  );
};

export default ExtendOrderButtonAction;

const styles = StyleSheet.create({
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
});
