import React, {useState,useRef,useCallback} from "react";
import { Animated, View } from "react-native";
import Screen from "../../config/screen";
import Colors from "../../config/colors";

interface StretchableImageProps {
  imageHeight: number,
  scrollY: any,
  url: string
}

const StretchableImage: React.FC<StretchableImageProps> = (props) => {
  const { imageHeight, scrollY, url } = props;

  const [ isShow, setShow ] = useState(false);
  const imageAnimated: any = useRef(new Animated.Value(0)).current;

  const onImageLoad = useCallback(() => {
    setShow(true);

    Animated.timing(imageAnimated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <Animated.View 
        style={{
          top: 0,
          width: Screen.width,
          height: imageHeight,
          position: 'absolute',
          backgroundColor: isShow ? Colors.defaultWhite : Colors.theme
        }}
      >
        <Animated.Image
          onLoad={onImageLoad}
          blurRadius={scrollY.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [20, 0, 20],
            extrapolate:'clamp',
          })}
          style={[{
            height: imageHeight,
            width: Screen.width,
            opacity: imageAnimated,
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [-imageHeight, 0],
                outputRange: [-imageHeight/2, 0],
                extrapolate:'clamp',
              })
            }, {
              scale: scrollY.interpolate({
                inputRange: [-imageHeight, 0, imageHeight],
                outputRange: [2, 1, 1],
                extrapolate:'clamp',
              })
            }]
        }]}
        source={{
          uri: url,
        }}
      />
      </Animated.View>
      <View style={{ height: imageHeight }} />
    </>
  )
}

export default StretchableImage;
