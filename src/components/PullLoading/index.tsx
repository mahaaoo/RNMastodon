/**
 * 根据ScrollView或者FlatList等组件，下拉动作显示的Loading
 */
import React, { useMemo, useEffect, memo } from "react";
import {ActivityIndicator, Animated} from "react-native";

interface PullLoadingProps {
  refreshing: boolean,
  scrollY: any,
  top: number,
  left: number,
  offsetY: number,
  size?: number,
  onRefresh?: () => void;
}

const PullLoading: React.FC<PullLoadingProps> = memo((props) => {
  const {refreshing, scrollY, top, left, size = 30, offsetY, onRefresh} = props;

  const optatus = useMemo(() => {
    if (!refreshing) {
      return scrollY.interpolate({
        inputRange: [-offsetY, 0],
        outputRange: [1, 0],
        extrapolate:'clamp',
      });
    } else {
      return 1;
    }
  }, [scrollY, refreshing]);

  useEffect(() => {
    if(refreshing) {
      onRefresh && onRefresh();
    }
  }, [refreshing]);

  return (
    <Animated.View
      style={{ 
        width: size, 
        height: size, 
        opacity: optatus,
        position: 'absolute',
        top: top - size / 2,
        left: left - size / 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}        
    >
      <ActivityIndicator color={"#fff"} />
    </Animated.View>
  )
});

export default PullLoading;
