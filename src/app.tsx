import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isReadyRef } from './utils/rootNavigation';
import Router from './router';
import { useStores } from "./store";

const App: React.FC<{}> = () => {
  const { appStore } = useStores();
  const initApp = async () => {
    await appStore.initApp();
  }
  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);

  return (
    <>
      <NavigationContainer 
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}  
      >
        <Router />
      </NavigationContainer>
    </>
  )  
}

export default App;