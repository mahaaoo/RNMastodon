import React, { useRef, useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, FlatList } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import HTML from "react-native-render-html";
// @ts-ignore
import ScrollableTabView from "react-native-scrollable-tab-view";
import MyTabBar from "../../components/ScrollableTabBar/defaultTabBar";

import Screen from "../../config/screen";
import Colors from "../../config/colors";
import { stringAddComma } from "../../utils/string";

import { getAccountsById } from "../../server/app";
import { useRequest } from "../../utils/hooks";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import { goBack } from "../../utils/rootNavigation";

const fetchUserById = (id: string = '') => {
  const fn = () => {
    return getAccountsById(id);
  }
  return fn;
}

interface AnimatedImageProps {
  scrollY: any,
  url: string,
}

const AnimatedImage: React.FC<AnimatedImageProps> = (props) => {
  const { scrollY, url } = props;
  const [ isShow, setShow ] = useState(false);
  const imageAnimated: any = useRef(new Animated.Value(0)).current;

  const onImageLoad = useCallback(() => {
    setShow(true);

    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: false,
      duration: 1000,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={{
        top: 0,
        width: Screen.width,
        height: 150,
        position: 'absolute',
        backgroundColor: isShow ? Colors.defaultWhite : Colors.theme
      }}
    >
      <Animated.Image
        onLoad={onImageLoad}
        blurRadius={scrollY.interpolate({
          inputRange: [-150, 0, 150],
          outputRange: [10, 0, 10],
        })}
        style={[{
          height: 150,
          width: Screen.width,
          opacity: imageAnimated,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [-150, 0, 150 - 0, 150],
              outputRange: [150 / 2, 0, -(150 - 0), -(150 - 0)],
            })
          }, {
          scale: scrollY.interpolate({
            inputRange: [-150, 0, 150],
            outputRange: [2, 1, 1],
          })
        }]
      }]}
      source={{
        uri: url,
      }}
    />
    </Animated.View>
  )
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

const dataSource = [
  1
];
const User: React.FC<UserProps> = (props) => {
  const { data: userData } = useRequest(fetchUserById(props?.route?.params?.id));
  const scrollY: any = useRef(new Animated.Value(0)).current;

  const handleBack = useCallback(goBack, []);

  useEffect(() => {
    if (userData) {
      console.log(userData);
    }
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff'  
    }}>
      <AnimatedImage scrollY={scrollY} url={userData?.header} />
      <FlatList 
        data={dataSource}
        onScroll={
          //滚动的时候，触发动画效果
          Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {useNativeDriver: false})
        }
        ListHeaderComponent={() => {
          return <View style={{ height: 150 }} />
        }}
        scrollEventThrottle={16}
        style={{backgroundColor: 'transparent'}} // 因为层次原因，防止把header遮住
        renderItem={() => {
          return (
            <>
              <View style={styles.header}>
                <View style={{ paddingHorizontal: 18 }}>
                  <View style={styles.title}>
                    <View style={styles.avatar}>
                      <Avatar url={userData?.avatar} size={65} borderColor={"#fff"} borderWidth={4} />
                    </View>
                    <Button text={"关注"} onPress={() => {}} style={{}} />
                  </View>
                  <View>
                    <Text style={styles.name}>{userData?.display_name}</Text>
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
              <ScrollableTabView style={{ backgroundColor: '#fff' }} renderTabBar={() => <MyTabBar style={{ justifyContent: 'flex-start' }} />}>
                <Text tabLabel="嘟文" />
                <Text tabLabel="嘟文和回复" />
                <Text tabLabel="已置顶" />
                <Text tabLabel="媒体" />
                <Text tabLabel="喜欢" />
              </ScrollableTabView>
            </>
          )
        }}
      />
      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <Image source={require("../../images/back.png")} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>  
    </View>
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
    marginTop: 10
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
