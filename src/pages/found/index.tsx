import React from "react";
import { View, Text, StyleSheet } from "react-native";
// @ts-ignore
import ScrollableTabView from "react-native-scrollable-tab-view";
import DefaultTabBar from "../../components/ScrollableTabBar/defaultTabBar";

import Local from "./local";
import Public from "./public";

const Found: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <ScrollableTabView style={{ backgroundColor: '#fff' }} renderTabBar={() => <DefaultTabBar />}>
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
  }
});

export default Found;
