import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

import SplitLine from "../SplitLine";
import Screen from "../../config/screen";
import Colors from "../../config/colors";

interface ListRowProps  {
  title: string;

  leftIcon?: React.ReactNode;
  rightView?: React.ReactNode;
  rightIcon?: React.ReactNode;

  onPress?: () => void;
  height?: number;
  canClick?: boolean;
}

const renderLeft = (props: ListRowProps) => {
  const { leftIcon } = props;
  if (!leftIcon || leftIcon === null) {
    return <View />;
  }
  return <View style={{ width: 20, justifyContent: "center", alignItems: "center", marginRight: 10 }}>{leftIcon}</View>;
};

const renderRight = (props: ListRowProps) => {
  const { rightView } = props;
  if (!rightView || rightView === null) {
    return <View />;
  }
  return <View style={{ marginRight: 10 }}>{rightView}</View>;
};

const renderRightIcon = (props: ListRowProps) => {
  const { rightIcon =  <Image source={require("../../images/rightArrow.png")} /> } = props;
  if (!rightIcon || rightIcon === null) {
    return <View />;
  }
  return rightIcon;
};

const ListRow: React.FC<ListRowProps> = (props) => {
  const { title, height = 55, onPress, canClick = true } = props;
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: Colors.defaultWhite,
          justifyContent: "space-between",
          alignItems: "center",
          height: height,
          paddingHorizontal: 15,
        }}
        onPress={() => {
          canClick ? onPress && onPress() : null;
        }}
        activeOpacity={canClick ? 0.2 : 1}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {renderLeft(props)}
          <Text style={{ fontSize: 16 }}>{title}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {renderRight(props)}
          {renderRightIcon(props)}
        </View>
      </TouchableOpacity>
      <SplitLine start={0} end={Screen.width} />
    </>
  );
};

export default ListRow;
