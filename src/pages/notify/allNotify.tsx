import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../config/colors";
import Screen from "../../config/screen";
import { Notification } from "../../config/interface";
import RefreshList, { RefreshState } from "../../components/RefreshList";
import { useRequest } from "../../utils/hooks";

import FollowItem from "./followItem";
import FavouriteItem from "./favouriteItem";
import { getNotifications } from "../../server/notifications";

const fetchNotifications = () => {
  const fn = (param: string) => {
    return getNotifications(param);
  }
  return fn;
}

interface AllNotifyProps {
}

const AllNotify: React.FC<AllNotifyProps> = (props) => {

  const { data: notifications, run: getNotifications } = useRequest(fetchNotifications(), { loading: false, manual: true }); // 获取用户发表过的推文
  const [dataSource, setDataSource] = useState<Notification[]>([]);
  const [listStatus, setListStatus] = useState<RefreshState>(RefreshState.Idle);



  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    // 每当请求了新数据，都将下拉刷新状态设置为false
    if(notifications) {
      if (listStatus === RefreshState.HeaderRefreshing) {
        setDataSource(notifications);
      }
      if(listStatus === RefreshState.FooterRefreshing) {
        const maxId = dataSource[0]?.id;
        if(dataSource[0].id < maxId) {
          setDataSource(listData => listData.concat(notifications));
        }
      }
      setListStatus(RefreshState.Idle);
    }
  }, [notifications])

  const handleLoadMore = useCallback(() => {
    setListStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = dataSource[dataSource.length - 1]?.id;
    getNotifications(`?max_id=${maxId}`);
  }, []);

  const handleRefresh = useCallback(() => {
    setListStatus(RefreshState.HeaderRefreshing);
    getNotifications();
  }, []);

  return (
    <View 
      style={styles.main}
    >
      <RefreshList
        showsVerticalScrollIndicator={false}
        style={{ flex:1, width: Screen.width }}
        data={dataSource}
        renderItem={({ item }) => {
          if (item?.type === "follow") {
            return <FollowItem item={item} />
          }
          if (item?.type === "favourite") {
            return <FavouriteItem item={item} />
          }
          return <View />
        }}
        onHeaderRefresh={handleRefresh}
        onFooterRefresh={handleLoadMore}
        scrollEventThrottle={1}
        refreshState={listStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.pageDefaultBackground,
    flex: 1,
  }
});

export default AllNotify;
