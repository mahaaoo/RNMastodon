import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import { getFollowersById } from "../../server/account";
import { useRequest } from "../../utils/hooks";
import { Account } from "../../config/interface";
import Screen from "../../config/screen";
import UserItem from "./userItem";
import Colors from "../../config/colors";

const fetchFollowersById = (id: string) => {
  const fn = (param: string) => {
    return getFollowersById(id, param);
  }
  return fn;
}

interface UserFansProps extends StackScreenProps<any> {}

const UserFans: React.FC<UserFansProps> = (props) => {
  const { data: followers, run: getFollowers } = useRequest(fetchFollowersById(props?.route?.params?.id), { manual: false, loading: true });

  const [dataSource, setDataSource] = useState<Account[]>([]);
  const [listStatus, setListStatus] = useState<RefreshState>(RefreshState.Idle);

  useEffect(() => {
    if(followers) {      
      if (listStatus === RefreshState.HeaderRefreshing || listStatus === RefreshState.Idle) {
        setDataSource(followers);
      }
      if(listStatus === RefreshState.FooterRefreshing) {
        const maxId = dataSource[0]?.id;
        if(dataSource[0].id < maxId) {
          setDataSource(listData => listData.concat(followers));
        }
      }
      setListStatus(RefreshState.Idle);
    }
  }, [followers])

  const handleLoadMore = useCallback(() => {
    setListStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = dataSource[dataSource.length - 1]?.id;
    getFollowers(`?max_id=${maxId}`);
  }, []);

  const handleRefresh = useCallback(() => {
    setListStatus(RefreshState.HeaderRefreshing);
    getFollowers();
  }, []);

  return(
    <View style={styles.main}>
      <RefreshList
        showsVerticalScrollIndicator={false}
        style={{ flex:1, width: Screen.width }}
        data={dataSource}
        renderItem={({ item }) => <UserItem item={item} />}
        onHeaderRefresh={handleRefresh}
        onFooterRefresh={handleLoadMore}
        scrollEventThrottle={1}
        refreshState={listStatus}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
  }
})

export default UserFans;
