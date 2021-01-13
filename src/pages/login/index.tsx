import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";

import Button from "../../components/Button";
import Color from "../../config/colors";
import Screen from "../../config/screen";
import { goBack, navigate } from "../../utils/rootNavigation";
import { useRequest } from "../../utils/hooks";
import { getAppConfig } from "../../server/app";
import { allowStateChanges } from "mobx/dist/internal";
// import { RedirectUris } from "../../config/oauth";

const fetchAppConfig = (host: string) => {
  const fn = () => {
    return getAppConfig(host);
  }
  return fn;
}

const Login: React.FC<{}> = () => {
  const [path, setPath] = useState("");
  const { data, run } = useRequest(fetchAppConfig("https://" + path), { manual: true });

  if(data) {
    const url = `https://${path}/oauth/authorize?scope=read%20write%20follow%20push&response_type=code&redirect_uri=${data.redirect_uri}&client_id=${data.client_id}`;
    navigate("WebView", { initUrl: url });
  }
  
  return (
    <SafeAreaView style={styles.main_view}>
      <View style={styles.go_back_view}>
        <Text style={styles.go_back_text} onPress={goBack}>取消</Text>
      </View>
      <Text style={styles.login_title}>登录Mastodon</Text>
      <TextInput 
        style={styles.input_style} 
        placeholder={"应用实例地址，例如：acg.mn"}
        autoFocus={true}
        onChangeText={(text) => { setPath(text)}}
      />
      <Button text={"登录"} onPress={run} style={styles.button_style} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    alignItems: 'center'
  },
  login_title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  input_style: {
    fontSize: 18,
    textAlign: 'left',
    marginHorizontal: 20,
    marginTop: 50,
    alignItems: 'flex-start',
  },
  button_style: {
    width: Screen.width - 80,
    marginVertical: 50
  },
  go_back_view: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20
  },
  go_back_text: {
    fontSize: 16,
    color: Color.buttonDefaultBackground
  }
})

export default Login;
