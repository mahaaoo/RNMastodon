import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, StyleSheet, TextInput, Animated, Keyboard, Easing, View, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import Button from "../../components/Button";
import Screen from "../../config/screen";
import Colors from "../../config/colors";
import { useStores } from "../../store";
import Avatar from "../../components/Avatar";
import { goBack } from "../../utils/rootNavigation";
import { useRequest } from "../../utils/hooks";
import { getInstanceEmojis } from "../../server/app";
import SplitLine from "../../components/SplitLine";

const fetchEmojis = () => {
  const fn = () => {
    return getInstanceEmojis();
  }
  return fn;
}


interface PublishProps {

}

const Publish: React.FC<PublishProps> = () => {
  const navigation = useNavigation();
  const {accountStore} = useStores();
  
  const { data: emojis, run: getEmojis } = useRequest(fetchEmojis(), { manual: false, loading: false });
  const offsetY: any = useRef(new Animated.Value(Screen.bottom)).current;
  const [scrollHeight, setScrollHeight] = useState(0);
  const InputRef: any = useRef();

  useEffect(() => {
    navigation.setOptions({ 
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          Keyboard.dismiss();
          goBack();
        }}
        >
          <Text 
            style={{ fontSize: 18, marginLeft: 15, color: Colors.theme }}
          >
            取消
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Button 
          style={styles.header}
          textStyle={styles.header_text}
          text={'发送'} 
          onPress={() => {
            Keyboard.dismiss();
          }}
        />
      ),
    });
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
    };
  }, []);

  const keyboardWillShow = useCallback((e: any) => {
    Animated.timing(offsetY, {
      toValue: e.endCoordinates.height,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setScrollHeight(e.endCoordinates.height-Screen.bottom);
    });
  }, []);

  const handleClickEmojis = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const handleClickPic = useCallback(() => {

    InputRef && InputRef?.current?.focus();
    // Keyboard.dismiss();

    // Animated.timing(offsetY, {
    //   toValue: Screen.bottom,
    //   duration: 200,
    //   useNativeDriver: false,
    //   easing: Easing.linear,
    // }).start(() => {
    // });
  }, [scrollHeight]);

  return (
    <View style={styles.main}>
      <View style={{ flexDirection: 'row'}}>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Avatar url={accountStore.currentAccount?.avatar} />
        </View>
        <TextInput 
          ref={InputRef}
          autoFocus={true} 
          style={styles.input} 
          textAlignVertical={'top'}
          multiline = {true}
          numberOfLines = {4}
          placeholder={"有什么新鲜事"}
          underlineColorAndroid={"transparent"}
        />
      </View>
      <View 
        style={{ 
          width: Screen.width,
          backgroundColor: '#fff',
          position: 'absolute',   
          bottom: 0,     
       }}>
        <Animated.View style={[styles.tool, { bottom: offsetY }]}>
          <View style={{ width: Screen.width, height: 50 }}>
            <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image source={require("../../images/erath.png")} style={{ width: 20, height: 20 }} />
              <Text style={{ color: Colors.theme, fontSize: 14, marginLeft: 5 }}>所有人可以回复</Text>
            </TouchableOpacity>
            <SplitLine start={0} end={Screen.width} />
          </View>
          <View style={{
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleClickPic}>
                <Image source={require("../../images/pic.png")} style={{ width: 35, height: 35 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image source={require("../../images/statistics.png")} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image source={require("../../images/warning.png")} style={{ width: 33, height: 33 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 20 }}>
                <Image source={require("../../images/time.png")} style={{ width: 40, height: 35 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: Colors.theme }}>123</Text>
              <View style={{ width: 1, height: 30, backgroundColor: Colors.defaultLineGreyColor, marginHorizontal: 15 }} />
              <TouchableOpacity style={{ marginRight: 15 }} onPress={handleClickEmojis}>
                <Image source={require("../../images/emojis.png")} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        <View 
          style={[styles.flatlist, { height: scrollHeight }]}
        >
          <FlatList 
            horizontal={false}
            numColumns={10}
            data={emojis}
            renderItem={({ item }) => {
              return (
                <FastImage
                  key={item.shortcode}
                  style={{ width: 30, height: 30, margin: 15 }}
                  source={{
                      uri: item.static_url,
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />            
              )
            }}
          >
          </FlatList>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1, 
    backgroundColor: Colors.defaultWhite
  },
  header: {
    paddingVertical: 0,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  header_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tool: {
    width: Screen.width,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  input: {
    flex: 1, 
    height: Screen.height / 3, 
    fontSize: 18, 
    marginHorizontal: 10,
    marginTop: 10
  },
  flatlist: {
    position: "absolute", 
    bottom: Screen.bottom, 
    width: Screen.width,
    overflow: 'hidden'
  }
})

export default Publish;
