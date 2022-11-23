import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  iconName: 'arrowright' | 'arrowleft';
  onPress: () => void;
}

const CarouselButton: React.FC<IProps> = ({iconName, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        iconName === 'arrowleft' ? {left: 20} : {right: 20},
      ]}
      onPress={onPress}>
      <Icon name={iconName} size={25} color="white" />
    </TouchableOpacity>
  );
};

export default CarouselButton;

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#BBBBBB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '45%',
  },
});
