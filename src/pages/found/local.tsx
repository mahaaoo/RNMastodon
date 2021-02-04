import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { observer } from "mobx-react";

import { Timelines } from "../../config/interface";
import { localLine } from "../../server/timeline";
import { useRequest } from "../../utils/hooks";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import HomeLineItem from "../home/homelineItem";
import Colors from "../../config/colors";

const fetchLocalLine = () => {
  const fn = (params: string) => {
    return localLine(params);
  }
  return fn;
}

interface LocalProps {
  tabLabel: string;
}

const Local: React.FC<LocalProps> = (props) => {
  const [listData, setListData] = useState<Timelines[]>([]);
  const [status, setStatus] = useState<RefreshState>(RefreshState.Idle);

  const { data: localLineData, run: getLocalLineData } = useRequest(fetchLocalLine(), { manual: true, loading: false });

  const handleRefresh = useCallback(() => {
    setStatus(status => status = RefreshState.HeaderRefreshing);
    getLocalLineData();
  }, [status]);

  const handleLoadMore = useCallback(() => {
    setStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = listData[listData.length - 1].id;
    getLocalLineData(`&max_id=${maxId}`);
  }, [status, listData]);

  useEffect(() => {
    getLocalLineData();
    setStatus(RefreshState.HeaderRefreshing);
  }, [])

  useEffect(() => {
    if(localLineData) {
      if (status === RefreshState.HeaderRefreshing || status === RefreshState.Idle) {
        setListData(localLineData);
      }
      if (status === RefreshState.FooterRefreshing) {
        setListData(listData => listData.concat(localLineData));
      }
      setStatus(RefreshState.Idle);
    }
  }, [ localLineData ]);

  return (
    <View style={styles.main}>
      <RefreshList 
        data={listData}
        renderItem={({ item }) => <HomeLineItem item={item} />}
        onHeaderRefresh={handleRefresh}
        onFooterRefresh={handleLoadMore}
        refreshState={status}
        {...props}
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

export default observer(Local);
