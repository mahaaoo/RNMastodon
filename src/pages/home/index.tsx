import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";

import { Timelines } from "../../config/interface";

import { navigate } from "../../utils/rootNavigation";
import { homeLine } from "../../server/timeline";
import { useRequest } from "../../utils/hooks";

import RefreshList from "../../components/RefreshList";
import HomeLineItem from "./homelineItem";

const fetchHomeLine = () => {
  const fn = () => {
    return homeLine();
  }
  return fn;
}

const Home: React.FC<{}> = () => {
  const {appStore} = useStores();

  const [isLogin, setIsLogin] = useState(false);
  const [listData, setListData] = useState<Timelines[]>([]);

  const { data: homeLineData, run: getHomeLineData } = useRequest(fetchHomeLine(), { manual: true });

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
      setListData(homeLineData);
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
      <RefreshList 
        data={listData}
        renderItem={({ item }) => <HomeLineItem item={item} />}
     />
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
