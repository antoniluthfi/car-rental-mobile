import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import DropdownBank from 'components/UploadBankTransferComponent/DropdownBank/DropdwonBank';
import hoc from 'components/hoc';
import React, {useEffect, useState} from 'react';
import SenderTextInput from 'components/UploadBankTransferComponent/SenderTextInput/SenderTextInput';
import UploadImageInput from 'components/UploadImageInput/UploadImageInput';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {h1, h5} from 'utils/styles';
import {ic_arrow_left_white, ic_bca, ic_mandiri} from 'assets/icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IPayments} from 'types/global.types';
import {orderState} from 'redux/features/order/orderSlice';
import {postDisbursements} from 'redux/features/order/orderAPI';
import {rowCenter} from 'utils/mixins';
import {showToast} from 'utils/Toast';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {
  UploadBankTransferFormData,
  UploadBankTransferFormError,
  UploadBankTransferScreenRouteProp,
} from './types';

const UploadBankTransferScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<UploadBankTransferScreenRouteProp>();
  const dispatch = useAppDispatch();
  const paymentMethods = useAppSelector(appDataState).payments;
  const transactionKey = useAppSelector(orderState).order.transaction_key;
  const isDisbursementSuccess =
    useAppSelector(orderState).isDisbursementSuccess;

  const [form, setForm] = useState<UploadBankTransferFormData>({
    sender_name: '',
    sender_bank_name: '',
    disbursement_confirmation_image: '',
    disbursement_confirmation_image_size: '',
  });
  const [formError, setFormError] = useState<UploadBankTransferFormError>({
    sender_name: '',
    sender_bank_name: '',
    disbursement_confirmation_image: '',
  });

  const openImagePicker = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
      });

      setForm({
        ...form,
        disbursement_confirmation_image: `data:image/png;base64,${result.assets?.[0]?.base64}`,
        disbursement_confirmation_image_size: result.assets?.[0]
          .fileSize as number,
      });
      setFormError({...formError, disbursement_confirmation_image: ''});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const _errorMessage: any = {};
    let status = true;
    if (!form.sender_name) {
      _errorMessage['sender_name'] = 'Masukan nama pengirim';
      status = false;
    }

    if (!form.sender_bank_name) {
      _errorMessage['sender_bank_name'] = 'Masukan bank anda';
      status = false;
    }

    if (!form.disbursement_confirmation_image) {
      _errorMessage['disbursement_confirmation_image'] =
        'Silahkan upload bukti pembayaran terlebih dahulu';
      status = false;
    }

    if (form.disbursement_confirmation_image_size >= 1000000) {
      _errorMessage['disbursement_confirmation_image'] =
        'Maaf, ukuran file tidak boleh lebih dari 1MB!';
      status = false;
    }

    setFormError({..._errorMessage});

    if (!status) return;

    dispatch(
      postDisbursements({
        transaction_key: transactionKey || route.params?.transaction_key,
        payment_type_id: paymentMethods.find(
          x => x.code == route.params?.selectedPayment.code,
        )?.id,
        sender_name: form.sender_name,
        sender_bank_name: form.sender_bank_name,
        disbursement_confirmation_image: form.disbursement_confirmation_image,
      }),
    );
  };

  useEffect(() => {
    if (isDisbursementSuccess) {
      showToast({
        message: t('global.alert.success_upload_proof_payment'),
        title: t('global.alert.success'),
        type: 'success',
      });

      navigation.navigate('MainTab', {
        screen: 'Booking',
      } as any);
    }
  }, [isDisbursementSuccess]);

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_white}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: 'white', marginLeft: 10}]}>
              {t('bank_transfer.upload_proof_payment')}
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        margin: 16,
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={[rowCenter, {marginTop: 10}]}>
          <Image
            source={ic_mandiri}
            style={{marginRight: 10, width: 60, height: 32}}
          />
          <Image
            source={ic_bca}
            style={{marginRight: 10, width: 60, height: 32}}
          />
          <Text style={[h5, {fontSize: 12, marginLeft: 10}]}>
            {t('bank_transfer.upload_proof_payment')}
          </Text>
        </View>

        <SenderTextInput
          onChangeText={v => {
            setForm({...form, sender_name: v});
            setFormError({...formError, sender_name: ''});
          }}
          errorMessage={formError.sender_name}
        />

        <DropdownBank
          onSelect={(v: IPayments) => {
            setForm({...form, sender_bank_name: v.code});
            setFormError({...formError, sender_bank_name: ''});
          }}
          selected={form.sender_bank_name}
          errorMessage={formError.sender_bank_name}
        />

        <UploadImageInput
          label="Upload Foto :"
          selectedImageLabel="Bukti Pembayaran.jpg"
          selected={form.disbursement_confirmation_image}
          onPress={openImagePicker}
          onDelete={() => {
            setForm({...form, disbursement_confirmation_image: ''});
            setFormError({
              ...formError,
              disbursement_confirmation_image:
                'Silahkan upload bukti pembayaran terlebih dahulu',
            });
          }}
          errorMessage={formError.disbursement_confirmation_image}
        />
      </View>

      <Button _theme="navy" onPress={handleSubmit} title={'Selesai'} />
    </View>
  );
};

export default hoc(UploadBankTransferScreen);
