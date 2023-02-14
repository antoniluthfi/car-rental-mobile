import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  colorSelecting,
  iconCustomSize,
  iconSize,
  rowCenter,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
import {ic_history, ic_info_error, ic_pinpoin} from 'assets/icons';
import {ICities} from 'types/global.types';
import {theme} from 'utils';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {showBSheet} from 'utils/BSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {toggleBSheet} from 'redux/features/utils/utilsSlice';
import {useAppDispatch} from 'redux/hooks';
import {setSearchHistory} from 'redux/features/appData/appDataSlice';
import {useTranslation} from 'react-i18next';

interface Props {
  data:
    | Array<{name: string; dial_code: string; code: string; emoji: string}>
    | any;
  onSelect: (item: ICities) => void | any;
  selected: any;
  errorMessage: string;
  searchHistory?: {
    id: number;
    name: string;
  };
}

const Dropdown: FC<Props> = ({
  data,
  onSelect,
  selected,
  errorMessage,
  searchHistory,
}) => {
  const dispatch = useAppDispatch();
  const DropdownButton: any = useRef();
  const [_selected, setSelected] = useState<any>(undefined);
  const {t} = useTranslation();

  const renderItem = ({item}: any): ReactElement<any, any> => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <View style={styles.item}>
        <Image source={ic_pinpoin} style={iconSize} />
        <Text style={[h1, {marginLeft: 10}]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const toggleDropdown = (): void => {
    showBSheet({
      content: (
        <View style={styles.bsheetWrapper}>
          <Text style={[h1, {fontSize: 18, marginBottom: 17}]}>
            {t('Home.daily.your_location')}
          </Text>

          {!!searchHistory && (
            <View>
              <Text style={[h5]}>{t('Home.daily.search_history')}</Text>
              <TouchableOpacity
                style={[styles.item, {marginBottom: 20}]}
                onPress={() => {
                  onItemPress(searchHistory);
                }}>
                <Image source={ic_history} style={iconSize} />
                <Text style={[h1, {marginLeft: 10}]}>{searchHistory.name}</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={[h5]}>{t('Home.daily.available_location')}</Text>

          <BottomSheetFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ),
    });
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    dispatch(setSearchHistory(item));
    dispatch(toggleBSheet(false));
  };

  return (
    <View>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <Text style={[h1]}>{t('Home.daily.location')}</Text>
      </View>

      <TouchableOpacity
        ref={DropdownButton}
        style={[
          rowCenter,
          styles.wrapper,
          {
            borderBottomColor: errorMessage
              ? theme.colors.red
              : theme.colors.grey5,
          },
        ]}
        onPress={toggleDropdown}>
        <Image source={ic_pinpoin} style={iconSize} />
        <Text style={[h5, colorSelecting(selected?.name), {marginLeft: 10}]}>
          {selected?.name || t('Home.daily.placeholder_location')}
        </Text>
      </TouchableOpacity>

      {errorMessage && (
        <View style={[rowCenter, {alignSelf: 'flex-end', marginTop: 5}]}>
          <Image source={ic_info_error} style={iconCustomSize(15)} />
          <Text style={[h1, {fontSize: 12, color: theme.colors.red}]}>
            {' '}
            {errorMessage}
          </Text>
        </View>
      )}
    </View>
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
  item: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    flexDirection: 'row',
  },
  wrapper: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginTop: 10,
  },
  bsheetWrapper: {
    width: WINDOW_WIDTH,
    flexGrow: 1,
    paddingHorizontal: '5%',
    paddingBottom: 30,
  },
});

export default Dropdown;
