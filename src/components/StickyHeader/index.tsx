import React, {useCallback, useMemo, memo, useState} from "react";
import { Animated, ViewStyle } from "react-native";

interface StickyHeaderProps {
  stickyHeaderY: number,
  stickyScrollY: any,
  children: React.ReactNode,
  style?: ViewStyle,
  onLayout?: (event: any) => void
}

const StickyHeader: React.FC<StickyHeaderProps> = memo((props) => {
  const {
    stickyHeaderY,
    stickyScrollY,
    children,
    style,
    onLayout,
    ...otherProps
  } = props;

  const [stickyLayoutY, setStickyLayoutY] = useState(0);

  const _onLayout = useCallback(
    (event) => {
      if (event && event.nativeEvent) {
        setStickyLayoutY(event.nativeEvent.layout.y);
      }
      onLayout && onLayout(event);
    },
    [onLayout],
  );

  const translateY = useMemo(() => {
    const y = stickyHeaderY !== -1 ? stickyHeaderY : stickyLayoutY;
    return stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    });
  }, [stickyHeaderY, stickyLayoutY, stickyScrollY]);

  return (
    <Animated.View
      onLayout={_onLayout}
      style={[style, {zIndex: 100}, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
});

export default StickyHeader;
