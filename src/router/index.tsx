import React from "react";
import { View } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Screen from "../config/screen";

import TabRoutes from "./tabRoutes";

import routes from "../pages";

const Stack = createStackNavigator();
const PagesRouter: React.FC<{}> = () => {
  return (
    <Stack.Navigator 
      initialRouteName='App'
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
      }} 
      mode="card" 
      headerMode="screen"
    >
      <Stack.Screen 
        name="App" 
        component={TabRoutes}
        options={({route}: {route: any}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

          let title = '首页';
          if(routeName == "Home") {
            title = "首页";
          }
          if(routeName == "Found") {
            title = "";
            return {
              title,
              header: () => <View style={{ height: Screen.top, backgroundColor: '#fff' }} />
            }
          }
          if(routeName == "Notify") {
            title = "";
            return {
              title,
              header: () => <View style={{ height: Screen.top, backgroundColor: '#fff' }} />
            }
          }
          if(routeName == "Setting") {
            title = "个人";
            return {
              title,
              header: () => null
            }
          }
          return {
            title
          }
        }}
      />
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