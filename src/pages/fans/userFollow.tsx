import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import RefreshList, { RefreshState } from "../../components/RefreshList";
import { getFollowingById } from "../../server/account";
import { useRequest } from "../../utils/hooks";
import { Account } from "../../config/interface";
import Screen from "../../config/screen";
import UserItem from "./userItem";

const fetchFollowingById = (id: string) => {
  const fn = (param: string) => {
    return getFollowingById(id, param);
  }
  return fn;
}

interface UserFollowProps extends StackScreenProps<any> {}

const UserFollow: React.FC<UserFollowProps> = (props) => {
  const { data: followings, run: getFollowing } = useRequest(fetchFollowingById(props?.route?.params?.id), { manual: false, loading: true });

  const [dataSource, setDataSource] = useState<Account[]>([]);
  const [listStatus, setListStatus] = useState<RefreshState>(RefreshState.Idle);

  useEffect(() => {
    if(followings) {      
      if (listStatus === RefreshState.HeaderRefreshing || listStatus === RefreshState.Idle) {
        setDataSource(followings);
      }
      if(listStatus === RefreshState.FooterRefreshing) {
        const maxId = dataSource[0]?.id;
        if(dataSource[0].id < maxId) {
          setDataSource(listData => listData.concat(followings));
        }
      }
      setListStatus(RefreshState.Idle);
    }
  }, [followings])

  const handleLoadMore = useCallback(() => {
    setListStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = dataSource[dataSource.length - 1]?.id;
    getFollowing(`?max_id=${maxId}`);
  }, []);

  const handleRefresh = useCallback(() => {
    setListStatus(RefreshState.HeaderRefreshing);
    getFollowing();
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
  }
})

export default UserFollow;
