import {ic_arrow_down, ic_info_error} from 'assets/icons';
import React, {FC, ReactElement, useRef, useState, Fragment} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  ViewStyle,
} from 'react-native';
import {appDataState} from 'redux/features/appData/appDataSlice';
import {useAppSelector} from 'redux/hooks';
import { IPayments } from 'types/global.types';
import {theme} from 'utils';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
// import { Icon } from 'react-native-elements';

interface IProps {
  onSelect: (item: IPayments) => void;
  selected: string;
  errorMessage: string;
  styleDropdown?: ViewStyle;
}


const DropdownBank: FC<IProps> = ({onSelect, selected, errorMessage, styleDropdown}) => {
  const DropdownButton: any = useRef();
  const [visible, setVisible] = useState(false);
  const [_selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const paymentMethods = useAppSelector(appDataState).payments;

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number,
      ) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <Fragment>
      <Text style={[h1, {fontSize: 12}]}>Nama Bank</Text>
      <View style={[styles.wrapper, styleDropdown]}>
        <TouchableOpacity
          ref={DropdownButton}
          style={[
            rowCenter,
            {
              borderBottomColor: errorMessage
                ? theme.colors.red
                : theme.colors.grey5,
              paddingVertical: 5,
              justifyContent: 'space-between',
            },
            
          ]}
          onPress={toggleDropdown}>
          <Text
            style={[
              h5,
              {fontSize: 14, marginLeft: 10, color: theme.colors.grey3},
            ]}>
            {selected || 'Pilih Bank Anda'}
          </Text>
          <Image source={ic_arrow_down} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <View style={[rowCenter, {marginTop: 5}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 12, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}

      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={paymentMethods.filter(
                payment => payment.method === 'Manual Transfer',
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
  },
  wrapper: {
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.grey7,
  },
  arrowImage: {
    width: 12,
    height: 7,
    marginRight: 15,
  },
});

export default DropdownBank;
