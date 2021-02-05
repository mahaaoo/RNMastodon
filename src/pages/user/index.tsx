import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import HTML from "react-native-render-html";
// @ts-ignore
import ScrollableTabView from "react-native-scrollable-tab-view";
import MyTabBar from "../../components/ScrollableTabBar/defaultTabBar";

import Screen from "../../config/screen";
import Colors from "../../config/colors";

import { stringAddComma } from "../../utils/string";
import { useRequest } from "../../utils/hooks";
import { goBack } from "../../utils/rootNavigation";

import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import StickyHeader from "../../components/StickyHeader";
import StretchableImage from "../../components/StretchableImage";
import PullLoading from "../../components/PullLoading";
import SlideHeader from "../../components/SlideHeader";

import { getAccountsById, getStatusesById } from "../../server/account";

import LineItemName from "../home/LineItemName";
import UseLine from "./useLine";
import { Timelines } from "../../config/interface";
import { RefreshState } from "../../components/RefreshList";

const fetchUserById = (id: string = '') => {
  const fn = () => {
    return getAccountsById(id);
  }
  return fn;
}

const fetchStatusById = (id: string = "") => {
  const fn = (param: string) => {
    return getStatusesById(id, param);
  }
  return fn;
}

const tagsStyles = { 
  p: {
    fontSize: 16,
    lineHeight: 20
  },
  a: {
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: 'none',
    color: Colors.linkTagColor,
  }
};

interface UserProps extends StackScreenProps<any> {
}

const IMAGEHEIGHT = 150; // 顶部下拉放大图片的高度
const HEADERHEIGHT = 104; // 上滑逐渐显示的Header的高度
const PULLOFFSETY = 100; // 下拉刷新的触发距离

const User: React.FC<UserProps> = (props) => {
  const scrollY: any = useRef(new Animated.Value(0)).current; //最外层ScrollView的滑动距离

  const { data: userData, run: getUserData } = useRequest(fetchUserById(props?.route?.params?.id), { manual: true, loading: true }); // 获取用户的个人信息
  const { data: userStatus, run: getUserStatus } = useRequest(fetchStatusById(props?.route?.params?.id), { loading: false, manual: true }); // 获取用户发表过的推文

  const [headHeight, setHeadHeight] = useState(0); // 为StickyHead计算顶吸到顶端的距离
  const [refreshing, setRefreshing] = useState(false); // 是否处于下拉加载的状态
  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true); // 最外层ScrollView是否可以滚动
  const [listData, setListData] = useState<Timelines[]>([]); // 内嵌的FlatList数据源
  const [listStatus, setListStatus] = useState<RefreshState>(RefreshState.Idle); // 内嵌的FlatList的当前状态

  useEffect(() => {
    getUserData();
    getUserStatus();
  }, [refreshing]);

  useEffect(() => {
    // 每当请求了新数据，都将下拉刷新状态设置为false
    setRefreshing(false);
    if(userStatus) {
      if (listStatus === RefreshState.Idle) {
        setListData(userStatus);
      }
      if(listStatus === RefreshState.FooterRefreshing) {
        setListData(listData => listData.concat(userStatus));
        setListStatus(RefreshState.Idle);
      }
    }
  }, [userStatus, userData])
  // 返回上一页
  const handleBack = useCallback(goBack, []);
  // 设置顶吸组件所在位置
  const handleOnLayout = (e: any) => {
    const { height } = e.nativeEvent.layout;
    setHeadHeight(height + IMAGEHEIGHT - HEADERHEIGHT); 
  }
  // 监听当前滚动位置 
  const handleListener = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY <= -100 && !refreshing) {
      setRefreshing(true);
    }
    if(offsetY >= headHeight && enableScrollViewScroll) {
      setEnableScrollViewScroll(false);
    } 
    return null;
  }
  // 下拉刷新执行方法
  // 2021-02-05 废弃：将刷新触发方法，放到useEffect中，监听refreshing状态
  // const handleRefresh = useCallback(() => {
  //   console.log("下拉刷新");
  // }, [])
  
  // 当嵌套在里面内容滑动到顶端，将外层的ScrollView设置为可滑动状态
  const handleSlide = useCallback(() => { 
    setEnableScrollViewScroll(true);    
  }, []);
  // 内部FlatList的上拉加载更多
  const handleLoadMore = useCallback(() => {
    setListStatus(status => status = RefreshState.FooterRefreshing);
    const maxId = listData[listData.length - 1].id;
    getUserStatus(`?max_id=${maxId}`);
  }, [listStatus, listData]);

  return (
    <>
      <Animated.ScrollView 
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
        bounces={true}
        onScroll={Animated.event([{ nativeEvent: 
          { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true,
            listener: handleListener
          })
        }
        scrollEventThrottle={1} 
        scrollEnabled={enableScrollViewScroll}  
        showsVerticalScrollIndicator={false}
      >
        <StretchableImage isblur={refreshing} scrollY={scrollY} url={userData?.header} imageHeight={IMAGEHEIGHT} />
        <View style={styles.header} onLayout={handleOnLayout}>
          <View style={{ paddingHorizontal: 18 }}>
            <View style={styles.title}>
              <View style={styles.avatar}>
                <Avatar url={userData?.avatar} size={65} borderColor={"#fff"} borderWidth={4} />
              </View>
              <Button 
                text={"关注"} 
                onPress={() => {}} 
                style={{ 
                  height: 40, 
                  paddingVertical: 8, 
                  borderRadius: 20, 
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: Colors.theme
                }}
                textStyle={{
                  color: Colors.theme
                }}
              />
            </View>
            <View>
              <LineItemName displayname={userData?.display_name} emojis={userData?.emojis} fontSize={18} />
              <Text style={styles.acct}><Text>@</Text>{userData?.acct}</Text>
            </View>
            <HTML source={{ html: userData?.note }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 10 }} />
            <View style={styles.act}>
              <Text style={styles.msg_number}>{stringAddComma(userData?.statuses_count)}<Text style={styles.msg}>&nbsp;嘟文</Text></Text>
              <Text style={[styles.msg_number, { marginLeft: 10 }]}>{stringAddComma(userData?.following_count)}<Text style={styles.msg}>&nbsp;正在关注</Text></Text>
              <Text style={[styles.msg_number, { marginLeft: 10 }]}>{stringAddComma(userData?.followers_count)}<Text style={styles.msg}>&nbsp;关注者</Text></Text>
            </View>
          </View>
        </View>
        <StickyHeader
          stickyHeaderY={headHeight} // 把头部高度传入
          stickyScrollY={scrollY}    // 把滑动距离传入
        >
          <ScrollableTabView style={{ backgroundColor: '#fff' }} renderTabBar={() => <MyTabBar style={{ justifyContent: 'flex-start' }} />}>
            <UseLine 
              tabLabel="嘟文"
              scrollEnabled={!enableScrollViewScroll}  
              onTop={handleSlide}
              dataSource={listData}
              loadMore={handleLoadMore}
              state={listStatus}
            />
            <View tabLabel="嘟文和回复" />
            <View tabLabel="已置顶" />
            <View tabLabel="媒体" />
            <View tabLabel="喜欢" />
          </ScrollableTabView>
        </StickyHeader>
      </Animated.ScrollView>
      <SlideHeader offsetY={IMAGEHEIGHT} scrollY={scrollY} height={HEADERHEIGHT}>
        <View style={{ marginTop: Screen.top }}>
          <LineItemName displayname={userData?.display_name} emojis={userData?.emojis} fontSize={18} />
        </View>
      </SlideHeader>
      <PullLoading 
        scrollY={scrollY} 
        refreshing={refreshing} 
        top={IMAGEHEIGHT/2} 
        left={Screen.width/2} 
        offsetY={PULLOFFSETY}
      />
      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <Image source={require("../../images/back.png")} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.pageDefaultBackground,
  },
  back: {
    position: 'absolute',
    left: 15,
    top: Screen.top + 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: Colors.defaultWhite,
  },
  avatar: {
    marginTop: -20,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  act: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  acct: {
    fontSize: 14,
    color: Colors.grayTextColor,
    marginTop: 5
  },
  msg_number: {
    fontWeight: 'bold',
  },
  msg: {
    fontWeight: 'normal',
    color: Colors.grayTextColor,
  }
});

export default User;
