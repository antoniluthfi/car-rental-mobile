import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import {theme} from 'utils';
import useEffectSkipInitialRender from 'utils/useEffectSkipInitialRender';
import {h1, h5} from 'utils/styles';
import Button from 'components/Button';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {utilsState} from 'redux/features/utils/utilsSlice';
import {authRegister, authRegisterConfirmation} from 'redux/features/auth/authAPI';
import { authState } from 'redux/features/auth/authSlice';
const TIMER = 299;
// const TIMER = 5;

const inputOtp: FC = () => {
  const [seconds, setSeconds] = useState(TIMER);
  const userData = useAppSelector(utilsState).userData;
  const dispatch = useAppDispatch();
  const token = useAppSelector(authState).token;

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
  });

  const methods = {
    resendOtp: () => {
      setSeconds(TIMER);
      dispatch(authRegister(userData));
    },
    secondsToHms:(d: any)=> {
      d = Number(d);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);
  
      var mDisplay = m > 0 ? m : '0';
      var sDisplay = s > 0 ? s : '0';
      return '0' + mDisplay + ':' + (sDisplay > 9 ? sDisplay : '0' + sDisplay);
    },
    handleConfirmationOTp:async()=> {
      // console.log(token)
      let res = await dispatch(authRegisterConfirmation({
        session: token.session,
        token: token.token,
      }));
    }
  };

  return (
    <View style={{width: '100%'}}>
      <OtpInputs
        numberOfInputs={6}
        handleChange={code => console.log(code)}
        autofillFromClipboard={false}
        style={styles.otpWrapper}
        inputStyles={styles.textOtp}
        inputContainerStyles={styles.inputContainerStyles}
      />
      {seconds !== 0 && (
        <Text style={[h1, styles.textTime]}>({methods.secondsToHms(seconds)})</Text>
      )}
      {seconds === 0 && (
        <Text style={[h5, styles.textResend2]}>
          Belum menerima OTP?{' '}
          <Text style={styles.textResend} onPress={methods.resendOtp}>
            Kirim Ulang
          </Text>
        </Text>
      )}
      <Button
        _theme="navy"
        title="Submit"
        onPress={methods.handleConfirmationOTp}
        styleWrapper={{
          marginTop: 44,
        }}
      />
    </View>
  );
};

export default inputOtp;

const styles = StyleSheet.create({
  textTime: {
    color: theme.colors.blue,
    textAlign: 'center',
    marginTop: 24,
  },
  textOtp: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    fontWeight: '700',
    borderColor: theme.colors.grey5,
    textAlign: 'center',
  },
  otpWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 24,
  },
  inputContainerStyles: {
    width: '15%',
    alignItems: 'center',
    height: 50,
  },
  textResend: {
    color: theme.colors.blue,
    fontWeight: '700',
  },
  textResend2: {textAlign: 'center', marginTop: 24},
});
