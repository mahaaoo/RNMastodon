import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';

import { defaultColor, styles } from "./default";
import { useAnimation } from "./SkeletonAnimate";

interface SkeletonAvatarProps {
  height?: number;
  width?: number;
  color?: string;
  borderRadius?: number;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = (props) => {
  const { height = 40, width = 40, borderRadius = 8, color = defaultColor } = props;
  const animationStyle = useAnimation();

  const avatarStyle = useMemo(() => {
    return {
      height: height,
      width: width,
      borderRadius: borderRadius,
      backgroundColor: color
    }
  }, []);

  return (
    <View style={[avatarStyle, styles.avatar]}>
      <Animated.View style={animationStyle} />
    </View>
  )
}
