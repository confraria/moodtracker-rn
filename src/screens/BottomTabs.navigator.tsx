import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import {AnalyticsIcon, HistoryIcon, HomeIcon} from '../components/icons';
import {theme} from '../theme';
import {Analytics} from './Analytics.screen';
import {History} from './History.screen';
import {Home} from './Home.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        headerTitleStyle: {
          fontFamily: theme.fontFamilyRegular,
        },
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size} />;
          }
          if (route.name === 'History') {
            return <HistoryIcon color={color} size={size} />;
          }
          if (route.name === 'Analytics') {
            return <AnalyticsIcon color={color} size={size} />;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{title: "Today's Mood"}}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{title: 'Past Moods'}}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{title: 'Fancy charts'}}
      />
    </BottomTabs.Navigator>
  );
};
