import React from "react";

import Web from "react-native-webview";
import { StackScreenProps } from "@react-navigation/stack"
import { RedirectUris } from "../../config/oauth";
import { goBack } from "../../utils/rootNavigation";
import { useNavigation } from "@react-navigation/native";


interface WebViewParams extends StackScreenProps<any> {
}



const WebView: React.FC<WebViewParams> = (props) => {
  const navigation = useNavigation();

  /** example:
   *  canGoBack: true
      canGoForward: false
      loading: false
      target: 197
      title: "mah93"
      url: "https://mah93.github.io/?code=1VV2En_DVAARI2f1B2Ov3gNfH7P5
   */
  const handleUrlChange = (urlBody: any) => {
    console.log(urlBody);
    navigation.setOptions({ title: urlBody.title });

    const url = urlBody?.url || "";
    if (url?.startsWith(RedirectUris) > 0 && url?.indexOf('code') > 0) {
      const urlList = url.split("?");
      if (urlList.length == 2 && urlList[1].length != 0) {
        const codeList = urlList[1].split("=");
        props?.route?.params?.callBack(codeList[1]);
        goBack();
      }
    }
  }

  return (
    <Web
      style={{ flex: 1 }}
      source={{ uri: props?.route?.params?.initUrl }}
      onNavigationStateChange={handleUrlChange}
    />
  )
}

export default WebView;
