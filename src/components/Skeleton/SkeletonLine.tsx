import React, { useMemo } from 'react';
import { View, Animated } from 'react-native';
import { useAnimation } from "./SkeletonAnimate";

import { defaultColor, styles } from "./default";

interface SkeletonLineProps {
  height?: number;
  width?: number;
  color?: string;
}

export const SkeletonLine: React.FC<SkeletonLineProps> = (props) => {
  const { height = 16, width = 100, color = defaultColor } = props;
  const animationStyle = useAnimation();

  const lineStyle = useMemo(() => {
    return {
      height: height,
      width: width,
      backgroundColor: color,
      marginVertical: 7,
      borderRadius: 3,
    }
  }, []);


  return (
    <View style={[lineStyle, styles.line]}>
      <Animated.View style={animationStyle} />
    </View>
  )
}
