import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";

import { navigate } from "../../utils/rootNavigation";
import { homeLine } from "../../server/timeline";
import { useRequest } from "../../utils/hooks";

const fetchHomeLine = () => {
  const fn = () => {
    return homeLine();
  }
  return fn;
}

const Home: React.FC<{}> = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { data: homeLineData, run: getHomeLineData } = useRequest(fetchHomeLine(), { manual: true });
  const {appStore} = useStores();

  useEffect(() => {
    if(appStore.hostUrl.length > 0 && appStore.token.length > 0) {
      setIsLogin(true);
      getHomeLineData();
    } else {
      navigate("Guide");
    }
  }, [appStore.hostUrl, appStore.token]);

  useEffect(() => {
    if(homeLineData) {
      console.log("获取的主页信息");
      console.log(homeLineData);
    }
  }, [ homeLineData ]);

  
  if(!isLogin) {
    return (
      <View style={{  flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  return (
    <View style={styles.main}>
      <Text>首页信息</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default observer(Home);
