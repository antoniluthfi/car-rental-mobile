import {useNavigation} from '@react-navigation/native';
import {ic_arrow_right_2, ic_get_ride} from 'assets/icons';
import {img_bg_auth} from 'assets/images';
import Button from 'components/Button';
import Splash from 'components/Splash/Splash';
import React, {FC, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { loginNoAuth } from 'redux/features/auth/authSlice';
import { useAppDispatch } from 'redux/hooks';
import {theme} from 'utils';
import {iconSize, rowCenter, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {FONT_SIZE_14} from 'utils/typography';

const AuthScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const heightValue = useSharedValue(123);
  const widthValue = useSharedValue(123);
  const positionValue: any = useSharedValue('absolute');
  const zIndexImgValue = useSharedValue(99);
  const imgLeftValue = useSharedValue(20);

  const opacityBgValue = useSharedValue(1);
  const zIndexBgValue = useSharedValue(1);
  const bgValue = useSharedValue(theme.colors.navy);
  const heightBgValue = useSharedValue(WINDOW_HEIGHT);

  const opacityTextValue = useSharedValue(0);
  const marginLeftValue = useSharedValue(0);

  const opacityBtnValue = useSharedValue(0);

  const rImage: any = useAnimatedStyle(() => {
    return {
      width: widthValue.value,
      height: heightValue.value,
      position: positionValue.value,
      zIndex: zIndexImgValue.value,
      marginLeft: imgLeftValue.value,
    };
  });
  const rText: any = useAnimatedStyle(() => {
    return {
      opacity: opacityTextValue.value,
      marginLeft: marginLeftValue.value,
    };
  });
  const rBg: any = useAnimatedStyle(() => {
    return {
      opacity: opacityBgValue.value,
      zIndex: zIndexBgValue.value,
      backgroundColor: bgValue.value,
      height: heightBgValue.value,
    };
  });

  const rBtn: any = useAnimatedStyle(() => {
    return {
      opacity: opacityBtnValue.value,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const option = {
        duration: 700,
      };
      heightValue.value = withTiming(43, option);
      widthValue.value = withTiming(43, option);
      positionValue.value = withTiming('relative', option);
      bgValue.value = withTiming('transparent', option);
      opacityTextValue.value = withTiming(1, option);
      marginLeftValue.value = withTiming(50, option);
      imgLeftValue.value = withTiming(0, option);
      opacityBtnValue.value = 1;
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.cBg, rBg]}>
        <Animated.View style={rBtn}>
          <TouchableOpacity style={styles.testWrapper} onPress={()=> dispatch(loginNoAuth())}>
            <Text style={styles.textTest}>Coba Sekarang</Text>
            <Image source={ic_arrow_right_2} style={iconSize} />
          </TouchableOpacity>
        </Animated.View>

        <View style={[rowCenter, styles.iconMainWrapper]}>
          <Animated.Image
            source={ic_get_ride}
            style={[styles.icMain, rImage]}
          />
          <Animated.Text style={[styles.textIcon, rText]}>
            Get & Ride
          </Animated.Text>
        </View>

        <Animated.View style={[styles.buttonWrapper, rBtn]}>
          <Button
            _theme="white"
            title="Daftar"
            onPress={() => navigation.navigate('Register')}
          />
          <Button
            _theme="transparent"
            title="Masuk"
            onPress={() => navigation.navigate('Login')}
            styleWrapper={{marginTop: 10}}
          />
        </Animated.View>
      </Animated.View>
      <ImageBackground
        source={img_bg_auth}
        resizeMode="cover"
        style={styles.image}>
        {/* <Splash /> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // justifyContent: 'center',
  },
  testWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: '15%',
  },
  textTest: {fontSize: FONT_SIZE_14, color: theme.colors.white},
  icMain: {
    height: 43,
    width: 43,
    alignSelf: 'center',
  },
  textIcon: {
    fontSize: 35,
    color: theme.colors.white,
    marginLeft: 10,
  },
  iconMainWrapper: {
    alignSelf: 'center',
    marginTop: WINDOW_HEIGHT / 3,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '95%',
    alignSelf: 'center',
  },
  cBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.navy,
  },
});

export default AuthScreen;
