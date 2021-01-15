import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils/rootNavigation';
import Router from './router';
import { useStores } from "./store";
import { reset } from "./utils/rootNavigation";

const App: React.FC<{}> = () => {
  const { appStore } = useStores();
  const initApp = async () => {
    await appStore.initApp();
  }
  useEffect(() => {
    initApp()
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </>
  )  
}

export default App;