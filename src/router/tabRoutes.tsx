import React from "react";
import { Image, StyleSheet, Text } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "../pages/home";
// import Found from "../pages/found";
import Notify from "../pages/notify";
import Setting from "../pages/setting";
import TopRoutes from "./topRoutes";

const TabStack = createBottomTabNavigator();

const tabConfigs = {
  home: {
    name: "Home",
    component: Home,
    icon: "../images/tab/home.png",
    options: { tabBarLabel: '首页' },
  },
  found: {
    name: "Found",
    component: TopRoutes,
    icon: "../images/tab/search.png",
    options: { tabBarLabel: '发现', header: () => null },
  },
  notify: {
    name: "Notify",
    component: Notify,
    icon: "../images/tab/bell.png",
    options: { tabBarLabel: '通知', tabBarBadge: 3 },
  },
  setting: {
    name: "Setting",
    component: Setting,
    icon: "../images/tab/user.png",
    options: { tabBarLabel: '个人' },
  },
};

const TabRouter: React.FC<{}> = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if(route.name == "Home") {
            return focused ? <Image source={require("../images/tab/home_selected.png")} style={styles.size} /> :  <Image source={require("../images/tab/home.png")} style={styles.size} />;
          }
          if(route.name == "Found") {
            return focused ? <Image source={require("../images/tab/search_selected.png")} style={styles.size} /> :  <Image source={require("../images/tab/search.png")} style={styles.size} />;
          }
          if(route.name == "Notify") {
            return focused ? <Image source={require("../images/tab/bell_selected.png")} style={styles.size} /> :  <Image source={require("../images/tab/bell.png")} style={styles.size} />;
          }
          if(route.name == "Setting") {
            return focused ? <Image source={require("../images/tab/user_selected.png")} style={styles.size} /> :  <Image source={require("../images/tab/user.png")} style={styles.size} />;
          }
          return null;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#2593FC',
        inactiveTintColor: '#999999',
      }}
    >
      {Object.keys(tabConfigs).map((key: string, i: number) => {
        // @ts-ignore
        const item = tabConfigs[key];
        return (
          <TabStack.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={`tabItem${i}`}
          />
        )
      })}
    </TabStack.Navigator>
  )
}

const styles = StyleSheet.create({
  size: {
    width: 25,
    height: 25,
  }
})
export default TabRouter;