import {Pressable, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import theme from 'utils/theme';
import {h1} from 'utils/styles';

interface IButton {
  title: string;
  _theme: ITheme;
  styleWrapper?: ViewStyle;
  onPress: ()=> void;
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

const Button = ({title, _theme, styleWrapper, onPress}: IButton) => {
  return (
    <TouchableOpacity
      onPressOut={onPress}
      style={[styles.buttonWrapper, ButtonTheme(_theme), styleWrapper]}>
      <Text style={[h1, TextTheme(_theme)]}>{title}</Text>
    </TouchableOpacity>
  );
};

const ButtonTheme: any = (_theme: ITheme) => ({
  backgroundColor: BUTTON_COLORS[_theme],
  borderWidth: _theme === 'transparent' ? 1 : 0,
  borderColor: 'white'
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
