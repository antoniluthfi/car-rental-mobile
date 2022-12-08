import { ReactNode } from 'react';
import {ImageSourcePropType, KeyboardType} from 'react-native';

type CommonProps = {
  errorMessage?: string;
  value?: string;
  label: string;
  placeholder: string;
  includeCheckbox?: ReactNode
};

type ConditionalInputType =
  | {
      type?: 'default';
      keyboardType?: KeyboardType;
      rightImageSource?: ImageSourcePropType;
      editable?: boolean;
      onChangeText: (text: string) => void;
    }
  | {
      type?: 'phone_number';
      keyboardType?: never;
      rightImageSource?: never;
      editable?: never;
      onChangeText: (countryCode: string, text: string) => void;
    };

export type ProfileTextInputProps = CommonProps & ConditionalInputType;
