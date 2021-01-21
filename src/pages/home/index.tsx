import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";

import { Timelines } from "../../config/interface";

import { navigate } from "../../utils/rootNavigation";
import { homeLine } from "../../server/timeline";
import { useRequest } from "../../utils/hooks";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import HomeLineItem from "./homelineItem";
import Colors from "../../config/colors";

const fetchHomeLine = () => {
  const fn = (params: string) => {
    return homeLine(params);
  }
  return fn;
}

const Home: React.FC<{}> = () => {
  const {appStore} = useStores();

  const [isLogin, setIsLogin] = useState(false);
  const [listData, setListData] = useState<Timelines[]>([]);
  const [status, setStatus] = useState<RefreshState>(RefreshState.Idle);

  const { data: homeLineData, run: getHomeLineData } = useRequest(fetchHomeLine(), { manual: true, loading: false });

  const handleRefresh = useCallback(() => {
    setStatus(status => status = RefreshState.HeaderRefreshing);
    getHomeLineData();
  }, [status]);

  const handleLoadMore = useCallback(() => {
    setStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = listData[listData.length - 1].id;
    getHomeLineData(`?max_id=${maxId}`);
  }, [status, listData]);

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
      if (status === RefreshState.HeaderRefreshing || status === RefreshState.Idle) {
        setListData(homeLineData);
      }
      if (status === RefreshState.FooterRefreshing) {
        setListData(listData => listData.concat(homeLineData));
      }
      setStatus(RefreshState.Idle);
    }
  }, [ homeLineData ]);
  
  if(!isLogin || !homeLineData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  return (
    <View style={styles.main}>
      <RefreshList 
        data={listData}
        renderItem={({ item }) => <HomeLineItem item={item} />}
        onHeaderRefresh={handleRefresh}
        onFooterRefresh={handleLoadMore}
        refreshState={status}
     />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
  },
  loading: {
    flex: 1, 
    backgroundColor: Colors.pageDefaultBackground, 
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default observer(Home);
