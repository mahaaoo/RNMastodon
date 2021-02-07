import React from "react";
import { View } from "react-native";
import Color from "../../config/colors";

interface SpacingBoxProps {
  height?: number;
  color?: string;
  width?: number;
}

const SpacingBox:React.FC<SpacingBoxProps> = (props) => {
  const { height, color, width } = props;
  return (
    <View style={{ width: width, height: height, backgroundColor: color }} />
  );
};

SpacingBox.defaultProps = {
  height: 10,
  color: Color.defaultWhite,
  width: 10,
};

export default SpacingBox;
