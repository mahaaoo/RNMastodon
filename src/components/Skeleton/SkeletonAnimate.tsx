import React, { useRef, useEffect, useContext } from 'react';
import { Animated, Easing, View, ActivityIndicator } from 'react-native';
import { styles, defaultColor } from "./default";
import Screen from "../../config/screen";

export const AnimationContext = React.createContext({});
export const useAnimation = () => useContext(AnimationContext);

const FadeDuration = 600;
const FadeStartValue = 1;
const FadeEndValue = 0.4;

export const Fade: React.FC<{}> = (props) => {
  const fade = useRef(new Animated.Value(FadeStartValue)).current;
  const { children } = props;

  const start = () => {
    Animated.sequence([
      Animated.timing(fade, {
        duration: FadeDuration,
        toValue: FadeEndValue,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        duration: FadeDuration,
        toValue: FadeStartValue,
        useNativeDriver: true,
      }),
    ]).start((e) => {
      if (e.finished) {
        start();
      }
    });
  }

  useEffect(() => {
    start();
  }, []);

  const animationStyle = {
    height: '100%',
    backgroundColor: '#E5E5E5',
    opacity: fade,
  };

  return (
    <AnimationContext.Provider value={animationStyle}>
      {children}
    </AnimationContext.Provider>
  )
}

export const Loading: React.FC<{}> = (props) => {
  const {children} = props;
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
      {children}
      <ActivityIndicator style={{ position: "absolute" }} />
    </View>
  )
}

const ShineDuration = 700;
const ShineStartValue = 0;
const ShineEndValue = 100;
/**
 * useNativeDriver由非原生驱动的事件
 * 因为原生驱动的话，不支持left或者marginLeft属性
 * 还可以考虑使用translateX
 */
export const Shine: React.FC<{}> = (props) => {
  const shine = useRef(new Animated.Value(ShineStartValue)).current;
  const { children } = props;

  const start = () => {
    shine.setValue(ShineStartValue);

    Animated.timing(shine, {
      duration: ShineDuration,
      toValue: ShineEndValue,
      useNativeDriver: false,
    }).start((e) => {
      if (e.finished) {
        start();
      }
    });
  }

  useEffect(() => {
    start();
  }, []);

  const shineStyle = shine.interpolate({
    inputRange: [ShineStartValue, ShineEndValue],
    outputRange: ["0%", "100%"],
  });

  return (
    <AnimationContext.Provider value={[ styles.shine, { left: shineStyle } ]}>
     {children}
    </AnimationContext.Provider>
  );
}


export const ShineOver: React.FC<{}> = (props) => {
  const shineOver = useRef(new Animated.Value(ShineStartValue)).current;
  const { children } = props;

  const start = () => {
    shineOver.setValue(ShineStartValue);

    Animated.timing(shineOver, {
      duration: ShineDuration,
      toValue: ShineEndValue,
      useNativeDriver: true,
    }).start((e) => {
      if (e.finished) {
        start();
      }
    });
  }

  useEffect(() => {
    start();
  }, []);

  const shineStyle = shineOver.interpolate({
    inputRange: [ShineStartValue, ShineEndValue],
    outputRange: [0, Screen.width],
  });

  return(
    <>
      {children}
      <Animated.View style={[styles.shineOver, { transform: [{translateX: shineStyle}] }]}  />
    </>
  )
}