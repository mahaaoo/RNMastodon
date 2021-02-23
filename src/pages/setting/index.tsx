import React from "react";
import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

import { useRequest } from "../../utils/hooks";
import { getSelfInformation } from "../../server/account";
import Screen from "../../config/screen";

const Setting: React.FC<{}> = () => {

  const {data} = useRequest(getSelfInformation);

  console.log(data);
  
  return (
    <View style={styles.main}>
      <FastImage
        style={{ width: Screen.width, height: 200 }}
        source={{
            uri: data?.header,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onError={() => {
          console.log("图片加载失败");
        }}
      />
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
