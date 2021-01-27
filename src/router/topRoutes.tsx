import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Local from "../pages/found/local";
import Public from "../pages/found/public";

import Colors from "../config/colors";
import { Theme } from "teaset";

const Top = createMaterialTopTabNavigator();

const TopRouter: React.FC<{}> = () => {
  return (
    <Top.Navigator
      swipeEnabled={true}
      gestureHandlerProps={{
        maxPointers: 1,
      }}
      style={{
      }}
      tabBarOptions={{
        activeTintColor: Colors.theme,
        inactiveTintColor: Colors.grayTextColor,
        style: {
          justifyContent: "center",
        },  
        tabStyle: { width: 'auto'},
        labelStyle: { fontWeight: 'bold' ,fontSize: 18, textAlign: "center", justifyContent: "center" },
        scrollEnabled: true
      }}
    >
      <Top.Screen 
        name="LocalTimeLine" 
        component={Local}
        options={{ tabBarLabel: '本站' }}
      />
      <Top.Screen 
        name="PublicTimeLine" 
        component={Public}
        options={{ tabBarLabel: '跨站' }}
      />
    </Top.Navigator>
  );
}

export default TopRouter;
