/**
 * 根据ScrollView或者FlatList等组件，上滑动作，逐渐显示的Header标题头
 */

import React from "react";
import { Animated,  } from "react-native";
import Screen from "../../config/screen";

interface SlideHeaderProps {
  width?: number,
  height: number,
  scrollY: any,
  offsetY?: number,
}

const SlideHeader: React.FC<SlideHeaderProps> = (props) => {
  const { children, width = Screen.width, height, scrollY, offsetY = height }  = props;
  return (
    <Animated.View 
      style={{ 
        width: width, 
        height: height, 
        backgroundColor: "#fff", 
        opacity: scrollY.interpolate({
          inputRange: [0, offsetY/2, offsetY],
          outputRange: [0, 0.3, 1],
          extrapolate:'clamp',
        }),
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Animated.View>
  )
};

export default SlideHeader;