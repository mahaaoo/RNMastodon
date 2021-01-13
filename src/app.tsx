import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/rootNavigation';
import Router from './router';

const App: React.FC<{}> = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </View>
  )
}

export default App;