import React from "react";
import { View, StyleSheet } from "react-native";
// @ts-ignore
import ScrollableTabView from "react-native-scrollable-tab-view";
import DefaultTabBar from "../../components/ScrollableTabBar/defaultTabBar";

import Local from "./local";
import Public from "./public";
import Screen from "../../config/screen";

const Found: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <ScrollableTabView style={{ backgroundColor: '#fff',  width: Screen.width }} renderTabBar={() => <DefaultTabBar />}>
        <Local tabLabel="本站" />
        <Public tabLabel="跨站" />
      </ScrollableTabView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: Screen.width
  }
});

export default Found;
