import React, { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import HTML from "react-native-render-html";

import Screen from "../../config/screen";
import Colors from "../../config/colors";

import { stringAddComma } from "../../utils/string";
import { useRequest } from "../../utils/hooks";

import Avatar from "../../components/Avatar";
import StretchableImage from "../../components/StretchableImage";
import PullLoading from "../../components/PullLoading";

import { getAccountsById } from "../../server/account";
import LineItemName from "../home/LineItemName";
import { replaceContentEmoji } from "../../utils/emoji";

const fetchUserById = (id: string = '') => {
  const fn = () => {
    return getAccountsById(id);
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

const IMAGEHEIGHT = 150; // 顶部下拉放大图片的高度
const PULLOFFSETY = 100; // 下拉刷新的触发距离

const Setting: React.FC<{}> = () => {
  const scrollY: any = useRef(new Animated.Value(0)).current; //最外层ScrollView的滑动距离

  const [refreshing, setRefreshing] = useState(false); // 是否处于下拉加载的状态
  const { data: userData, run: getUserData } = useRequest(fetchUserById('54180'), { manual: true, loading: true }); // 获取用户的个人信息

  useEffect(() => {
    getUserData();
  }, []);

  const handleListener = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY <= -PULLOFFSETY && !refreshing) {
      setRefreshing(true);
    }
    return null;
  }
  
  useEffect(() => {
    if(refreshing) {
      getUserData();
    }
  }, [refreshing])

  useEffect(() => {
    if(userData) {
      setRefreshing(false);
    }
  }, [userData]);

  return (
    <Animated.ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.pageDefaultBackground
      }}
      bounces={true}
      onScroll={Animated.event([{ nativeEvent: 
        { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true,
          listener: handleListener
        })
      }
      scrollEventThrottle={1} 
    >
      <StretchableImage isblur={refreshing} scrollY={scrollY} url={userData?.header} imageHeight={IMAGEHEIGHT} />
      <View style={styles.header}>
        <View style={{ paddingHorizontal: 18 }}>
          <View style={styles.title}>
            <View style={styles.avatar}>
              <Avatar url={userData?.avatar} size={65} borderColor={"#fff"} borderWidth={4} />
            </View>
          </View>
          <View>
            <LineItemName displayname={userData?.display_name || userData?.username} emojis={userData?.emojis} fontSize={18} />
            <Text style={styles.acct}><Text>@</Text>{userData?.acct}</Text>
          </View>
          <HTML source={{ html: replaceContentEmoji(userData?.note, userData?.emojis) }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 10 }} />
          <View style={styles.act}>
            <View style={styles.actItem}>
              <Text style={styles.msg_number}>{stringAddComma(userData?.statuses_count)}</Text>
              <Text style={styles.msg}>嘟文</Text>
            </View>
            <View style={styles.actItem}>
              <Text style={styles.msg_number}>{stringAddComma(userData?.following_count)}</Text>
              <Text style={styles.msg}>关注</Text>
            </View>
            <View style={styles.actItem}>
              <Text style={styles.msg_number}>{stringAddComma(userData?.followers_count)}</Text>
              <Text style={styles.msg}>粉丝</Text>
            </View>
          </View>
        </View>
      </View>
      <PullLoading 
        scrollY={scrollY} 
        refreshing={refreshing} 
        top={IMAGEHEIGHT/2} 
        left={Screen.width/2} 
        offsetY={PULLOFFSETY}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 10,
    justifyContent: 'space-around',
  },
  actItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  acct: {
    fontSize: 14,
    color: Colors.grayTextColor,
    marginTop: 5
  },
  msg_number: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  msg: {
    fontWeight: 'normal',
    color: Colors.grayTextColor,
    marginTop: 5,
  }
});
export default Setting;
