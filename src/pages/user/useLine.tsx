import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Text, UIManager, findNodeHandle } from "react-native";
import HomeLineItem from "../home/homelineItem";
import Colors from "../../config/colors";
import Screen from "../../config/screen";

interface UserLineProps {
  tabLabel: string;
  scrollEnabled: boolean,
}
const dataSource = [
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
  1111,
  2222,
  3333,
]

const UserLine: React.FC<UserLineProps> = (props) => {
  const { tabLabel, scrollEnabled, onTop } = props;
  const table: any = useRef(null);
  
  const handleListener = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < 1) {
      console.log("出发几次");
      onTop && onTop();
      // 保证table滚到最上面
      table?.current?.scrollToOffset({x: 0, y: 0, animated: true})
    }
    return null;
  }

  const handleClick = () => {
    // table.current && UIManager.measure(findNodeHandle(table?.current), (x, y, width, height, pageX, pageY) => {
    //   console.log(pageX, pageY)
    //   if (pageY >= 154 && scrollEnabled) {
    //     onTop && onTop();
    //   } 
    // })

  };

  return (
    <View 
      style={styles.main}
    >
      <FlatList 
        bounces={false}
        ref={table}
        showsVerticalScrollIndicator={false}
        style={{ width: Screen.width }}
        data={dataSource}
        renderItem={({item}) => {
          return <Text style={{ fontSize: 18 }}>{item}</Text>
        }}
        scrollEnabled = {scrollEnabled}
        onScroll={handleListener}
        scrollEventThrottle={1} 
        onTouchStart={handleClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pageDefaultBackground,
    height: Screen.height - 154,
    width: Screen.width
  }
});

export default UserLine;
