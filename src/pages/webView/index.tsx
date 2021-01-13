import React from "react";
import Web from "react-native-webview";

const WebView: React.FC<{}> = ({ route }) => {
  console.log(route);
  return (
    <Web
      style={{ flex: 1 }}
      source={{ uri: route.params.initUrl }}
    />
  )
}

export default WebView;
