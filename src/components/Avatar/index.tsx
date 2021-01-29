import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image'

import Screen from "../../config/screen";

interface AvatarProps {
  url: string
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const { url } = props;

  // 为请求失败的头像，添加一个默认的头像图标
  if(!isLoad) {
    return (
      <View style={styles.default_view}>
        <Image source={require("../../images/user.png")} style={{ width: 25, height: 25 }} />
      </View>
    );
  }

  return (
    <FastImage
      style={{ width: 45, height: 45, borderRadius: 8 }}
      source={{
          uri: url,
          priority: FastImage.priority.normal,
      }}
      onError={() => {
        setIsLoad(false);   
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
}

const styles = StyleSheet.create({
  default_view: {
    width: 45, 
    height: 45, 
    borderRadius: 8, 
    borderColor: "#9f9f9f", 
    borderWidth: Screen.onePixel, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Avatar;
