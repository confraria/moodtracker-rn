import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './App.provider';
import {BottomTabsNavigator} from './screens/BottomTabs.navigator';

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};
