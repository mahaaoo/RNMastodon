import { Dimensions, PixelRatio } from "react-native";
//@ts-ignore
import { Theme } from "teaset";

export default {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  onePixel: 1 / PixelRatio.get(),
  top: Theme.screenInset.top,
};
