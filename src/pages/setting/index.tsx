import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRequest } from "../../utils/hooks";
import { getSelfInformation } from "../../server/account";

const fetchSelfInformation = () => {
  const fn = () => {
    return getSelfInformation();
  }
  return fn;
}


const Setting: React.FC<{}> = () => {

  const {data} = useRequest(fetchSelfInformation());

  console.log(data);
  
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
