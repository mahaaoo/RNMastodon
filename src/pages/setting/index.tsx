import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Setting: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <Text>设置</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Setting;
