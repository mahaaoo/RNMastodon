import React from "react";

import Web from "react-native-webview";
import { StackScreenProps } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native";


interface LinkParams extends StackScreenProps<any> {
}


const Link: React.FC<LinkParams> = (props) => {
  const navigation = useNavigation();

  return (
    <Web
      style={{ flex: 1 }}
      source={{ uri: props?.route?.params?.url }}
    />
  )
}

export default Link;
