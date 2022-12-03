import {Image, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import hoc from 'components/hoc';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import appBar from 'components/AppBar/AppBar';
import {rowCenter} from 'utils/mixins';
import {ic_arrow_left_white, ic_bca, ic_mandiri} from 'assets/icons';
import {h1, h5} from 'utils/styles';
import Button from 'components/Button';
import DropdownBank from 'components/UploadBankTransferComponent/DropdownBank/DropdwonBank';
import UploadImageInput from 'components/UploadBankTransferComponent/UploadImageInput/UploadImageInput';
import {
  UploadBankTransferFormData,
  UploadBankTransferFormError,
  UploadBankTransferScreenRouteProp,
} from './types';
import {IPayments} from 'types/global.types';
import SenderTextInput from 'components/UploadBankTransferComponent/SenderTextInput/SenderTextInput';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {postDisbursements} from 'redux/features/order/orderAPI';
import {appDataState} from 'redux/features/appData/appDataSlice';

const UploadBankTransferScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<UploadBankTransferScreenRouteProp>();
  const dispatch = useAppDispatch();
  const paymentMethods = useAppSelector(appDataState).payments;

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
      });

      setForm({
        ...form,
        disbursement_confirmation_image:
          Platform.OS === 'ios'
            ? result.assets?.[0].uri?.replace('file://', '')
            : result.assets?.[0].uri,
        disbursement_confirmation_image_size: result.assets?.[0]
          .fileSize as number,
      });
      setFormError({...formError, disbursement_confirmation_image: ''});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    let _errorMessage: any = {};
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
        transaction_key: route.params?.transaction_key,
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
              Upload Bukti Pembayaran
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
            Upload Bukti Pembayaran
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
