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

import { getAccountsById } from "../../server/app";

import LineItemName from "../home/LineItemName";
import UseLine from "./useLine";

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

interface UserProps extends StackScreenProps<any> {
}

const IMAGEHEIGHT = 150;
const HEADERHEIGHT = 104;
const PULLOFFSETY = 100;

const User: React.FC<UserProps> = (props) => {
  const [headHeight, setHeadHeight] = useState(0);
  const { data: userData, run: getUserData } = useRequest(fetchUserById(props?.route?.params?.id), { manual: true });

  const handleBack = useCallback(goBack, []);
  const scrollY: any = useRef(new Animated.Value(0)).current;

  const [refreshing, setRefreshing] = useState(false);
  const [enableScrollViewScroll, setEnableScrollViewScroll] = useState(true);
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
  const handleRefresh = useCallback(() => {
     getUserData();
  }, [])
  // 请求到了数据
  useEffect(() => {
    if(userData) {
      setRefreshing(false);
    }
  }, [userData])

  const handleSlide = useCallback(() => { 
    setEnableScrollViewScroll(true);    
  }, []);

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
        onRefresh={handleRefresh}
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
