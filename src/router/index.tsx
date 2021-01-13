import React from "react";

import { createStackNavigator } from '@react-navigation/stack';

import TabRoutes from "./tabRoutes";
import Guide from "../pages/guide";

import routes from "../pages";

const Stack = createStackNavigator();
const PagesRouter: React.FC<{}> = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Guide'
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }} 
      mode="card" 
      headerMode="screen"
    >
      <Stack.Screen name="TabRoute" component={TabRoutes}></Stack.Screen>
      <Stack.Screen 
        name="Guide" 
        component={Guide}
        options={{ 
          headerShown: false
        }}
      ></Stack.Screen>
      {routes.map((item, i) => {
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={`${i}`}
          />
        );
      })}
    </Stack.Navigator>
  )
}

export default PagesRouter;