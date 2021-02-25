import React, { useRef, useEffect, useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, SectionList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import HTML from "react-native-render-html";
// @ts-ignore
import ScrollableTabView from "react-native-scrollable-tab-view";
import MyTabBar from "../../components/ScrollableTabBar/defaultTabBar";
import HomeLineItem from "../home/homelineItem";

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
import UseLine from "../user/useLine";
import Favourites from "../user/favourites";
import { replaceContentEmoji } from "../../utils/emoji";

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

const IMAGEHEIGHT = 150; // 顶部下拉放大图片的高度
const HEADERHEIGHT = 104; // 上滑逐渐显示的Header的高度
const PULLOFFSETY = 100; // 下拉刷新的触发距离


const Setting: React.FC<{}> = () => {
  const scrollY: any = useRef(new Animated.Value(0)).current; //最外层ScrollView的滑动距离

  const { data: userData, run: getUserData } = useRequest(fetchUserById('54180'), { manual: true, loading: true }); // 获取用户的个人信息
  const { data: userStatus, run: getUserStatus } = useRequest(fetchStatusById('54180'), { loading: false, manual: true }); // 获取用户发表过的推文
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    getUserData();
    getUserStatus();
  }, []);

  useEffect(() => {
    if(userStatus) {
      setDataSource(userStatus);
    }
  }, [userStatus]);

  if(userStatus?.length === 0) return <View />

  const data = useMemo(() => {
    return [{
      data: dataSource
    }]
  }, [dataSource]);

  return (
    <>
      <SectionList 
        sections={data}
        style={{ flex:1}}
        keyExtractor={(item, index) => "SectionList" + index}
        renderItem={({ item }) => <HomeLineItem item={item} />}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <>
              <StretchableImage scrollY={scrollY} url={userData?.header} imageHeight={IMAGEHEIGHT} />
              <View style={styles.header}>
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
                  <HTML source={{ html: replaceContentEmoji(userData?.note, userData?.emojis) }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 10 }} />
                  <View style={styles.act}>
                    <Text style={styles.msg_number}>{stringAddComma(userData?.statuses_count)}<Text style={styles.msg}>&nbsp;嘟文</Text></Text>
                    <Text style={[styles.msg_number, { marginLeft: 10 }]}>{stringAddComma(userData?.following_count)}<Text style={styles.msg}>&nbsp;正在关注</Text></Text>
                    <Text style={[styles.msg_number, { marginLeft: 10 }]}>{stringAddComma(userData?.followers_count)}<Text style={styles.msg}>&nbsp;关注者</Text></Text>
                  </View>
                </View>
              </View>
            </>
          )
        }}
        onEndReachedThreshold={0.01}
        renderSectionHeader={() => {
          return(
            <View style={{ width: Screen.width, height: 100, flexDirection: 'row', backgroundColor: 'white', alignItems: 'flex-end' }}>
              <Text style={styles.sectionHeader}>推文</Text>
              <Text style={styles.sectionHeader}>推文和回复</Text>
              <Text style={styles.sectionHeader}>已置顶</Text>
              <Text style={styles.sectionHeader}>喜欢</Text>
              <Text style={styles.sectionHeader}>媒体</Text>
            </View>
          )
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginHorizontal: 10,
    fontSize: 16,
    marginBottom: 20
  },
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
export default Setting;
