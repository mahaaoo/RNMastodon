import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { observer } from "mobx-react";
import { useStores } from "../../store";

import { Timelines } from "../../config/interface";

import { navigate } from "../../utils/rootNavigation";
import { homeLine } from "../../server/timeline";
import { verifyToken } from "../../server/app";
import { useRequest } from "../../utils/hooks";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import HomeLineItem from "./homelineItem";
import Colors from "../../config/colors";
import DefaultLineItem from "./defaultLineItem";
import Screen from "../../config/screen";

const fetchHomeLine = () => {
  const fn = (params: string) => {
    return homeLine(params);
  }
  return fn;
}

const Home: React.FC<{}> = () => {
  const {appStore, accountStore} = useStores();

  const [listData, setListData] = useState<Timelines[]>(new Array(6));
  const [status, setStatus] = useState<RefreshState>(RefreshState.Idle);

  const { data: homeLineData, run: getHomeLineData } = useRequest(fetchHomeLine(), { manual: true, loading: false });
  const { data: account, run: fetchVerifyToken } = useRequest(verifyToken, { manual: true, loading: true });


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
    if(appStore?.hostUrl && appStore?.token && appStore?.hostUrl?.length > 0 && appStore?.token?.length > 0) {
      fetchVerifyToken();
    } else {
      navigate("Guide");
    }
  }, [appStore.hostUrl, appStore.token]);

  useEffect(() => {
    if(account) {
      getHomeLineData();
      accountStore.setCurrentAccount(account);
    } else {
      navigate("Guide");
    }
  }, [account])

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
  
  const publishNewStatue = useCallback(() => {
    navigate("Publish");
  }, []);

  return (
    <View style={styles.main}>
      <RefreshList
        data={listData}
        renderItem={({ item }) => {
          // 默认为RefreshList添加6个骨架屏
          if(listData.length === 6) {
            return <DefaultLineItem />
          } 
          return <HomeLineItem item={item} />
        }}
        onHeaderRefresh={handleRefresh}
        onFooterRefresh={handleLoadMore}
        refreshState={status}
     />
      <TouchableOpacity style={styles.new} onPress={publishNewStatue}>
        <Image source={require("../../images/message.png")} style={{ width: 33, height: 33 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
    width: Screen.width,
  },
  loading: {
    flex: 1, 
    backgroundColor: Colors.pageDefaultBackground, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  new: {
    position: 'absolute',
    right: 20, 
    bottom: 20,
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.theme,
    borderRadius: 35,
  }
});

export default observer(Home);
