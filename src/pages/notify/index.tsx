import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notify: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <Text>消息通知</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Notify;
