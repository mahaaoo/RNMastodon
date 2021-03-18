import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Text, StyleSheet, TextInput, Animated, Keyboard, Easing, View, Image, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import SplitLine from "../../components/SplitLine";
import ActionsSheet from "../../components/ActionsSheet";

import Screen from "../../config/screen";
import Colors from "../../config/colors";
import { useStores } from "../../store";
import { goBack } from "../../utils/rootNavigation";
import { useRequest } from "../../utils/hooks";
import { getInstanceEmojis } from "../../server/app";
import { postNewStatuses } from "../../server/status";

const fetchEmojis = () => {
  const fn = () => {
    return getInstanceEmojis();
  }
  return fn;
}

const fetchNewStatuses = () => {
  const fn = (params: Object) => {
    return postNewStatuses(params);
  }
  return fn;
}

interface PublishProps {

}

const Publish: React.FC<PublishProps> = () => {
  const navigation = useNavigation();
  const {accountStore} = useStores();
  
  const { data: emojis, run: getEmojis } = useRequest(fetchEmojis(), { manual: false, loading: false });
  const { data, run: postNewStatuses } = useRequest(fetchNewStatuses(), { manual: true, loading: true });

  const offsetY: any = useRef(new Animated.Value(Screen.bottom)).current;
  const InputRef: any = useRef();

  const [scrollHeight, setScrollHeight] = useState(0);
  const [content, setContent] = useState<string>('');
  const [modal, setModal] = useState(false); 

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
    };
  }, []);

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
            postNewStatuses({
              status: content
            });
            Keyboard.dismiss();
          }}
        />
      ),
    });
  }, [content]);

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
  }, []);

  const currentContentSize = useMemo(() => {
    return content.length;
  }, [content]);
  
  // const buttonCanClick = useMemo(() => {
  //   return content.length > 0;
  // }, [content]);

  // const show = (modal) => {
  //   Keyboard.dismiss();
  //   let items = [
  //     {title: 'Say hello', onPress: () => alert('Hello')},
  //     {title: 'Do nothing'},
  //     {title: 'Disabled', disabled: true},
  //   ];
  //   let cancelItem = {title: 'Cancel'};
  //   ActionSheet.show(items, cancelItem, {modal});
  // }

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
          value={content}
          onChangeText={(text) => { setContent(text) }}
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
            <TouchableOpacity style={styles.power} onPress={() => { setModal(true) }}>
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
              <Text style={{ fontSize: 16, color: Colors.theme }}>{currentContentSize}</Text>
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
                <TouchableOpacity onPress={() => {
                  setContent((content: string) => content = content + `:${item.shortcode}:`);
                }}>
                  <FastImage
                    key={item.shortcode}
                    style={{ width: 30, height: 30, margin: 15 }}
                    source={{
                        uri: item.static_url,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />    
                </TouchableOpacity>        
              )
            }}
          >
          </FlatList>
        </View>
      </View>
      <ActionsSheet 
        show={modal} 
        clickBlank={() => setModal(false)} 
        defalutHeight={scrollHeight + Screen.bottom}
        title={"谁可以回复？"}
        description={"选择谁可以回复这条嘟文，任何提及的人始终都能回复。"}
      >
        <TouchableOpacity style={styles.actionitem}>
          <View style={styles.imageContainer}>
            <Image source={require("../../images/earth_white.png")} style={{ width: 25, height: 25 }} />
          </View>
          <Text style={{ fontSize: 18 }}>任何人可以回复</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionitem}>
          <View style={styles.imageContainer}>
            <Image source={require("../../images/on_white.png")} style={{ width: 25, height: 25 }} />
          </View>
          <Text style={{ fontSize: 18 }}>关注的人可以回复</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionitem}>
          <View style={styles.imageContainer}>
            <Image source={require("../../images/mention_white.png")} style={{ width: 25, height: 25 }} />
          </View>
          <Text style={{ fontSize: 18 }}>提及的人才可以回复</Text>
        </TouchableOpacity>
      </ActionsSheet>
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
  },
  power: {
    marginLeft: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1
  },
  actionitem: {
    width: Screen.width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15
  },
})    

export default Publish;
