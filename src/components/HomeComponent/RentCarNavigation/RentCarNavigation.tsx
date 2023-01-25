import AirportLayout from '../AirportLayout';
import DailyLayout from '../DailyLayout';
import TourLayout from '../TourLayout';
import { ic_daily_car_active } from 'assets/icons';
import { ITopTabs } from 'types/top-tab.types';
import { ReactElement, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { iconSize, rowCenter } from 'utils/mixins';
import { h1 } from 'utils/styles';
import { theme } from 'utils';

type IDataTab = {
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
  {
    title: 'Airport Transfer',
    active_icon: ic_daily_car_active,
    inactive_icon: ic_daily_car_active,
    id: 'airport',
    comp: <AirportLayout/>,
  },
  {
    title: 'tour',
    active_icon: ic_daily_car_active,
    inactive_icon: ic_daily_car_active,
    id: 'tour',
    comp: <TourLayout/>,
  },
];

const RentCarNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ITopTabs>('daily');
  const methods = {
    topTabTextStyle: (active: boolean) =>
      active ? styles.activeTabText : styles.inActiveTabText,
    isActiveTab: (text: ITopTabs) => activeTab === text,
  };

  return (
    <View style={styles.container}>
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
  )
}

export default RentCarNavigation;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -10,
    backgroundColor: 'white',
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