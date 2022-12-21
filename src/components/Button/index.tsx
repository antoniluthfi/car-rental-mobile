import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {h1} from 'utils/styles';
import theme from 'utils/theme';

interface IButton {
  title: string;
  _theme: ITheme;
  styleWrapper?: ViewStyle;
  styleText?: TextStyle;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  lineColor?: string;
}

type ITheme = 'white' | 'navy' | 'transparent';

const BUTTON_COLORS = {
  white: theme.colors.white,
  navy: theme.colors.navy,
  transparent: 'transparent',
};

const TEXT_COLORS = {
  white: theme.colors.navy,
  navy: theme.colors.white,
  transparent: theme.colors.white,
  
};

const Button = ({
  title,
  _theme,
  styleWrapper,
  styleText,
  onPress,
  isLoading,
  disabled = false,
  lineColor,
}: IButton) => {
  return (
    <TouchableOpacity
      onPressOut={onPress}
      disabled={isLoading || disabled}
      style={[
        styles.buttonWrapper,
        ButtonTheme(_theme, isLoading),
        styleWrapper,
        disabled && {backgroundColor: theme.colors.grey6},
        lineColor && {borderColor: lineColor, borderWidth: 1}
      ]}>
      {!isLoading && (
        <Text style={[h1, TextTheme(_theme), styleText]}>{title}</Text>
      )}
      {isLoading && (
        <ActivityIndicator size={'small'} color={theme.colors.white} />
      )}
    </TouchableOpacity>
  );
};

const ButtonTheme: any = (_theme: ITheme, isLoading: boolean) => ({
  backgroundColor: isLoading ? '#5d6878' : BUTTON_COLORS[_theme],
  borderWidth: _theme === 'transparent' ? 1 : 0,
  borderColor: 'white',
});

const TextTheme: any = (_theme: ITheme) => ({
  color: TEXT_COLORS[_theme],
});

export default Button;

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
});
