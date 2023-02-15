import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {RootTabParamList} from '../types/navigator';
import {
  HomeScreen,
  BookingScreen,
  InboxScreen,
  AccountScreen,
} from '../screens';
import BottomNavigator from './BottomNavigator';
import {useFocusEffect} from '@react-navigation/native';
import {Animated} from 'react-native';
import {theme} from 'utils';
import {useTranslation} from 'react-i18next';

const RootTab = createBottomTabNavigator<RootTabParamList>();

const FadeInView = (props: any) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeHomeScreen = (props: any) => (
  <FadeInView>
    <HomeScreen {...props} />
  </FadeInView>
);

const FadeBookingScreen = (props: any) => (
  <FadeInView>
    <BookingScreen {...props} />
  </FadeInView>
);

const FadeInboxScreen = (props: any) => (
  <FadeInView>
    <InboxScreen {...props} />
  </FadeInView>
);

const FadeAccountScreen = (props: any) => (
  <FadeInView>
    <AccountScreen {...props} />
  </FadeInView>
);

const MainTab: React.FC = () => {
  const {t} = useTranslation();

  return (
    <RootTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={(props: any) => <BottomNavigator {...props} />}>
      <RootTab.Screen
        name="Home"
        component={FadeHomeScreen}
        options={{
          tabBarLabel: t('Home.tabBarLabel') as any,
          tabBarShowLabel: true,
        }}
      />
      <RootTab.Screen
        name="Booking"
        component={FadeBookingScreen}
        options={{
          tabBarLabel: t('myBooking.tabBarLabel') as any,
          tabBarShowLabel: true,
          headerStyle: {
            backgroundColor: theme.colors.navy,
          },
        }}
      />
      <RootTab.Screen
        name="Inbox"
        component={FadeInboxScreen}
        options={{
          tabBarLabel: t('myInbox.tabBarLabel') as any,
          tabBarShowLabel: true,
          headerStyle: {
            backgroundColor: theme.colors.navy,
          },
        }}
      />
      <RootTab.Screen
        name="Account"
        component={FadeAccountScreen}
        options={{
          tabBarLabel: t('settings.tabBarLabel') as any,
          tabBarShowLabel: true,
          headerStyle: {
            backgroundColor: theme.colors.navy,
          },
        }}
      />
    </RootTab.Navigator>
  );
};

export default MainTab;
