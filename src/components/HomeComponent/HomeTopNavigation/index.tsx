import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {ReactElement, useState} from 'react';
import {ic_daily_car_active} from 'assets/icons';
import {theme} from 'utils';
import {container, rowCenter, iconSize, boxShadow} from 'utils/mixins';
import {h1} from 'utils/styles';
import {FC} from 'react';
import {ITopTabs} from 'types/top-tab.types';
import DailyLayout from '../DailyLayout';
import AirportLayout from '../AirportLayout';
import TourLayout from '../TourLayout';

interface IDataTab {
  title: string;
  active_icon: any;
  inactive_icon: any;
  id: ITopTabs;
  comp: ReactElement;
}
const DataTab: IDataTab[] = [
  {
    title: 'Daily',
    active_icon: ic_daily_car_active,
    inactive_icon: ic_daily_car_active,
    id: 'daily',
    comp: <DailyLayout/>,
  },
  // {
  //   title: 'Airport Transfer',
  //   active_icon: ic_daily_car_active,
  //   inactive_icon: ic_daily_car_active,
  //   id: 'airport',
  //   comp: <AirportLayout/>,
  // },
  // {
  //   title: 'tour',
  //   active_icon: ic_daily_car_active,
  //   inactive_icon: ic_daily_car_active,
  //   id: 'tour',
  //   comp: <TourLayout/>,
  // },
];
const HomeTopNavigation: FC = () => {
  const [activeTab, setActiveTab] = useState<ITopTabs>('daily');

  const methods = {
    topTabTextStyle: (active: boolean) =>
      active ? styles.activeTabText : styles.inActiveTabText,
    isActiveTab: (text: ITopTabs) => activeTab === text,
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.wrapper]}>
        {DataTab.map((x: IDataTab, i: number) => (
          <TouchableOpacity onPress={() => setActiveTab(x.id)} key={i}>
            <View style={rowCenter}>
              <Image
                source={
                  methods.isActiveTab(x.id) ? x.active_icon : x.inactive_icon
                }
                style={iconSize}
              />
              <Text
                style={[
                  h1,
                  methods.topTabTextStyle(methods.isActiveTab(x.id)),
                ]}>
                {x.title}
              </Text>
            </View>
            {methods.isActiveTab(x.id) && <View style={styles.lineMenu} />}
          </TouchableOpacity>
        ))}
      </View>

      {DataTab.find(x=> x.id === activeTab)?.comp}
    </View>
  );
};

export default HomeTopNavigation;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -10,
    backgroundColor: 'white',
    // flex: 1,
    padding: 16,
    paddingHorizontal: 25,
  },
  lineMenu: {
    borderBottomColor: theme.colors.navy,
    borderBottomWidth: 2.5,
    marginTop: 5,
  },
  activeTabText: {
    color: theme.colors.navy,
    fontWeight: '700',
  },
  inActiveTabText: {
    color: theme.colors.grey2,
    fontWeight: '500',
  },
});
