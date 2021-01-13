import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Home: React.FC<{}> = () => {
  return (
    <View style={styles.main}>
      <Text>首页信息</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home;
