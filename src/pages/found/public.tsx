import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react";

import { Timelines } from "../../config/interface";
import { publicLine } from "../../server/timeline";
import { useRequest } from "../../utils/hooks";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import HomeLineItem from "../home/homelineItem";
import Colors from "../../config/colors";

const fetchPublicLine = () => {
  const fn = (params: string) => {
    return publicLine(params);
  }
  return fn;
}


interface PublicProps {
  tabLabel: string;
}

const Public: React.FC<PublicProps> = () => {
  const [listData, setListData] = useState<Timelines[]>([]);
  const [status, setStatus] = useState<RefreshState>(RefreshState.Idle);

  const { data: publicLineData, run: getPublicLineData } = useRequest(fetchPublicLine(), { manual: true, loading: false });

  const handleRefresh = useCallback(() => {
    setStatus(status => status = RefreshState.HeaderRefreshing);
    getPublicLineData();
  }, [status]);

  const handleLoadMore = useCallback(() => {
    setStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = listData[listData.length - 1].id;
    getPublicLineData(`?max_id=${maxId}`);
  }, [status, listData]);

  useEffect(() => {
    getPublicLineData();
    setStatus(RefreshState.HeaderRefreshing);
  }, [])

  useEffect(() => {
    if(publicLineData) {
      if (status === RefreshState.HeaderRefreshing || status === RefreshState.Idle) {
        setListData(publicLineData);
      }
      if (status === RefreshState.FooterRefreshing) {
        setListData(listData => listData.concat(publicLineData));
      }
      setStatus(RefreshState.Idle);
    }
  }, [ publicLineData ]);

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
  }
});

export default observer(Public);
