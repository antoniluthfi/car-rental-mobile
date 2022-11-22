import {ic_pinpoin} from 'assets/icons';
import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from 'react-native';
import {ICities} from 'types/global.types';
import {theme} from 'utils';
import {iconSize, rowCenter} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
// import { Icon } from 'react-native-elements';

interface Props {
  label: string;
  data:
    | Array<{name: string; dial_code: string; code: string; emoji: string}>
    | any;
  onSelect: (item: ICities) => void | any;
  selected: any;
}

const Dropdown: FC<Props> = ({label, data, onSelect, selected}) => {
  const DropdownButton: any = useRef();
  const [visible, setVisible] = useState(false);
  const [_selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [widthBox, setWidthBox] = useState(0);

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
        setDropdownLeft(_px);
        setWidthBox(_w);
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
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none" style={{}}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}>
          <View
            style={[
              styles.dropdown,
              {top: dropdownTop, left: dropdownLeft, width: widthBox},
            ]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={{marginRight: 10}}>
      <TouchableOpacity
        ref={DropdownButton}
        style={[rowCenter, styles.wrapper]}
        onPress={toggleDropdown}>
        {renderDropdown()}
        <Text style={[h5, {}]}>
          {label} {selected ? ':' : ''} {selected}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#efefef',
    height: 40,
    borderRadius: 8,
    // borderWidth: 1,
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
    // position: 'absolute',
    backgroundColor: '#fff',
    // alignSelf: 'auto',
    // marginLeft: 20,
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
  },
  wrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey3,
    padding: 10,
    borderRadius: 20,
    width: '100%',
    // marginTop: 10,
  },
});

export default Dropdown;
