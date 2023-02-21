import React, {useEffect, useState} from 'react';
import {deepClone, theme} from 'utils';
import {FONT_SIZE_12} from 'utils/typography';
import {h1, radius} from 'utils/styles';
import {ic_eye_close} from 'assets/icons';
import {iconSize} from 'utils/mixins';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {TextInputProps} from 'react-native';

interface ITextInput extends TextInputProps {
  title?: string;
  placeholder: string;
  errorMessage: string;
  leftIcon?: any;
  disabled?: boolean;
  styleTitle?: TextStyle;
  outline?: boolean;
}

const CustomTextInput = ({
  title,
  placeholder,
  secureTextEntry = false,
  onChangeText,
  value,
  errorMessage,
  leftIcon,
  disabled,
  styleTitle,
  outline,
  keyboardType
}: ITextInput) => {
  const [showText, setShowText] = useState<boolean>(deepClone(secureTextEntry));
  const shake = useSharedValue(0);
  const _err = deepClone(errorMessage || '');

  const rText = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: shake.value,
        },
      ],
    };
  });

  useEffect(() => {
    shake.value = withSequence(
      withTiming(-10, {duration: 50}),
      withRepeat(withTiming(10, {duration: 200}), 3, true),
      withTiming(0, {duration: 50}),
    );
  }, [_err]);

  const inputStyles = outline
    ? [
        styles.outlineInputWrapper,
        {
          borderBottomColor: errorMessage
            ? theme.colors.red
            : theme.colors.grey5,
        },
      ]
    : [
        styles.inputWrapper,
        {borderColor: errorMessage ? theme.colors.red : theme.colors.grey5},
      ];

  return (
    <View>
      {title && <Text style={[styles.title, h1, styleTitle]}>{title}</Text>}
      <View style={inputStyles as any}>
        {leftIcon && (
          <Image source={leftIcon} style={[iconSize, {marginRight: 10}]} />
        )}
        <TextInput
          placeholder={placeholder}
          style={[styles.input]}
          secureTextEntry={showText}
          onChangeText={onChangeText}
          value={value}
          editable={!disabled}
          keyboardType={keyboardType}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowText(!showText)}>
            <Image source={ic_eye_close} style={styles.eye} />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Animated.Text style={[styles.textError, rText]}>
          {errorMessage}
        </Animated.Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  outlineInputWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 5,
  },
  inputWrapper: {
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.s,
    marginTop: 12,
  },
  input: {
    width: '95%',
    margin: 0,
    padding: 0,
    color: '#000',
  },
  eye: {
    height: 20,
    width: 20,
  },
  title: {
    fontSize: FONT_SIZE_12,
  },
  textError: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.red,
    marginTop: 3,
    fontWeight: '500',
    marginRight: 0,
  },
});
