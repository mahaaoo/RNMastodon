import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image'

import Screen from "../../config/screen";

interface AvatarProps {
  url: string,
  size?: number,
  borderColor?: string,
  borderWidth?: number,
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const [isLoad, setIsLoad] = useState(true);
  const { url, size = 45, borderColor, borderWidth } = props;

  // 为请求失败的头像，添加一个默认的头像图标
  if(!isLoad || !url || url.length == 0) {
    return (
      <View style={[styles.default_view, {width: size, height: size, borderRadius: 8, borderColor: borderColor, borderWidth: borderWidth}]}>
        <Image source={require("../../images/user.png")} style={{ width: 25, height: 25 }} />
      </View>
    );
  }

  return (
    <FastImage
      style={{ width: size, height: size, borderRadius: 8, borderColor: borderColor, borderWidth: borderWidth }}
      source={{
          uri: url,
          priority: FastImage.priority.normal,
      }}
      onError={() => {
        console.log("头像加载失败");
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
