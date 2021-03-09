import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllNotify from "../pages/notify/allNotify";
import Message from "../pages/notify/message";

import Colors from "../config/colors";

const Top = createMaterialTopTabNavigator();

const TopRouter: React.FC<{}> = () => {
  return (
    <Top.Navigator
      swipeEnabled={true}
      gestureHandlerProps={{
        maxPointers: 1,
      }}
      tabBarOptions={{
        activeTintColor: Colors.theme,
        inactiveTintColor: Colors.grayTextColor,
        style: {
          justifyContent: "center",
        },  
        labelStyle: { fontWeight: 'bold' ,fontSize: 16, textAlign: "center", justifyContent: "center" },
      }}
    >
      <Top.Screen 
        name="AllNotify" 
        component={AllNotify}
        options={{ tabBarLabel: '全部' }}
      />
      <Top.Screen 
        name="Message" 
        component={Message}
        options={{ tabBarLabel: '消息' }}
      />
    </Top.Navigator>
  );
}

export default TopRouter;
