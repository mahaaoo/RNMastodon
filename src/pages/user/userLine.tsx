import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../config/colors";
import Screen from "../../config/screen";
import { Timelines } from "../../config/interface";
import HomeLineItem from "../home/homelineItem";
import RefreshList, { RefreshState } from "../../components/RefreshList";
import { useRequest } from "../../utils/hooks";


const fetchStatusById = (id: string = "", request: (id: string, param: string) => Promise<Timelines[]>) => {
  const fn = (param: string) => {
    return request(id, param);
  }
  return fn;
}

interface UserLineProps {
  tabLabel: string;
  scrollEnabled: boolean,
  onTop: () => void,
  id: string,
  refreshing: boolean,
  onFinish: () => void,
  request: (id: string, param: string) => Promise<Timelines[]>,
}

const UserLine: React.FC<UserLineProps> = (props) => {
  const { scrollEnabled, onTop, id, refreshing, onFinish, request} = props;

  const { data: userStatus, run: getUserStatus } = useRequest(fetchStatusById(id, request), { loading: false, manual: true }); // 获取用户发表过的推文
  const [dataSource, setDataSource] = useState<Timelines[]>([]);
  const [listStatus, setListStatus] = useState<RefreshState>(RefreshState.Idle); // 内嵌的FlatList的当前状态
  const table: any = useRef(null);
  
  useEffect(() => {
    getUserStatus();
  }, []);

  useEffect(() => {
    if(refreshing) {
      getUserStatus();
    }
  }, [refreshing])

  useEffect(() => {
    // 每当请求了新数据，都将下拉刷新状态设置为false
    if(userStatus) {
      if (listStatus === RefreshState.Idle) {
        setDataSource(userStatus);
      }
      if(listStatus === RefreshState.FooterRefreshing) {
        const maxId = dataSource[0]?.id;
        if(userStatus[0].id < maxId) {
          setDataSource(listData => listData.concat(userStatus));
        }

        setListStatus(RefreshState.Idle);
      }
      // 请求结束，通知父组件完成本次刷新
      onFinish && onFinish();
    }
  }, [userStatus])

  const handleListener = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < 1) {
      onTop && onTop();
      // 保证table滚到最上面
      table?.current?.scrollToOffset({x: 0, y: 0, animated: true})
    }
    return null;
  }

  const handleLoadMore = useCallback(() => {
    setListStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = dataSource[dataSource.length - 1]?.id;
    getUserStatus(`?max_id=${maxId}`);
  }, []);

  return (
    <View 
      style={styles.main}
    >
      <RefreshList
        bounces={false}
        ref={table}
        showsVerticalScrollIndicator={false}
        style={{ flex:1, width: Screen.width }}
        data={dataSource}
        renderItem={({ item }) => <HomeLineItem item={item} />}
        scrollEnabled = {scrollEnabled}
        onScroll={handleListener}
        scrollEventThrottle={1}
        refreshState={listStatus}
        onFooterRefresh={handleLoadMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
    height: Screen.height - 104 - 50, // 上滑逐渐显示的Header的高度+ScrollableTabView高度
    width: Screen.width
  }
});

export default UserLine;
