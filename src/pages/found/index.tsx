import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Found: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <Text>发现中心</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Found;
