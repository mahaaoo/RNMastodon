import React from "react";
import FastImage from 'react-native-fast-image'

interface AvatarProps {
  url: string
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { url } = props;
  return (
    <FastImage
      style={{ width: 50, height: 50, borderRadius: 8 }}
      source={{
          uri: url,
          priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
}

export default Avatar;
