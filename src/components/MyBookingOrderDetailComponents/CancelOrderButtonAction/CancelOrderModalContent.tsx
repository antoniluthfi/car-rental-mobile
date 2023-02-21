import Button from 'components/Button';
import CustomTextInput from 'components/TextInput';
import DropdownBank from 'components/UploadBankTransferComponent/DropdownBank/DropdwonBank';
import React, {useState} from 'react';
import {h1} from 'utils/styles';
import {IPayments} from 'types/global.types';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {theme} from 'utils';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch} from 'redux/hooks';
import {useTranslation} from 'react-i18next';
import {WINDOW_WIDTH} from 'utils/mixins';

type Form = {
  name: string;
  bank: string;
  bank_account_number: string;
  cancelation_reason: string;
};

type CancelOrderModalContentProps = {
  onSubmit: (val: Form) => void;
};

const CancelOrderModalContent: React.FC<CancelOrderModalContentProps> = ({
  onSubmit,
}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const [formCancel, setFormCancel] = useState<Form>({
    name: '',
    bank: '',
    bank_account_number: '',
    cancelation_reason: '',
  });

  return (
    <View
      style={[
        styles.bsheetWrapper,
        {alignItems: 'flex-start', paddingLeft: 16, width: '100%'},
      ]}>
      <Text style={h1}>{t('detail_order.order_cancellation')}</Text>
      <View style={{marginTop: 20}} />
      <CustomTextInput
        title={t('detail_order.name') as any}
        placeholder={t('settings.fullNamePlaceholder')}
        errorMessage=""
        onChangeText={v => {
          setFormCancel({...formCancel, name: v});
        }}
        value={formCancel.name}
        styleTitle={{
          fontSize: 12,
        }}
      />
      <View style={{marginTop: 15}} />
      <DropdownBank
        styleDropdown={{
          width: '95%',
          marginTop: 10,
        }}
        onSelect={(v: IPayments) => {
          setFormCancel({...formCancel, bank: v.code});
        }}
        selected={formCancel.bank}
      />
      <View style={{marginTop: 15}} />
      <CustomTextInput
        title={t('detail_order.account_number') as any}
        placeholder={t('detail_order.enter_account_number')}
        errorMessage=""
        onChangeText={v =>
          setFormCancel({...formCancel, bank_account_number: v})
        }
        value={formCancel.bank_account_number}
        styleTitle={{
          fontSize: 12,
        }}
      />
      <View style={{marginVertical: 20, width: '95%'}}>
        <Text style={[h1, {fontSize: 12}]}>
          {t('detail_order.write_reason_cancellation')}
        </Text>
        <View style={styles.formWrapper}>
          <TextInput
            multiline={true}
            placeholder={t('detail_order.write_description') as any}
            style={{
              height: 100,
              paddingRight: 15,
            }}
            maxLength={150}
            onChangeText={v =>
              setFormCancel({...formCancel, cancelation_reason: v})
            }
            value={formCancel.cancelation_reason}
          />
        </View>
      </View>

      <View style={[styles.btnWrapper]}>
        <Button
          _theme="white"
          title={t('global.button.back')}
          onPress={() => {
            dispatch(toggleBSheet(false));
          }}
          styleWrapper={{width: '48%'}}
        />

        <Button
          _theme="navy"
          title={t('global.button.yesNext')}
          onPress={() => onSubmit(formCancel)}
          styleWrapper={{width: '48%'}}
        />
      </View>
    </View>
  );
};

export default CancelOrderModalContent;

const styles = StyleSheet.create({
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flex: 1,
    alignItems: 'center',
    margin: 16,
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
