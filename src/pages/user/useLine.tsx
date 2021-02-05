import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../config/colors";
import Screen from "../../config/screen";
import { Timelines } from "../../config/interface";
import HomeLineItem from "../home/homelineItem";
import RefreshList, { RefreshState } from "../../components/RefreshList";

interface UserLineProps {
  tabLabel: string;
  scrollEnabled: boolean,
  onTop: () => void,
  dataSource: Array<Timelines>,
  loadMore?: () => void,
  state: RefreshState
}

const UserLine: React.FC<UserLineProps> = (props) => {
  const { scrollEnabled, onTop, dataSource, loadMore, state } = props;
  const table: any = useRef(null);
  
  const handleListener = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < 1) {
      onTop && onTop();
      // 保证table滚到最上面
      table?.current?.scrollToOffset({x: 0, y: 0, animated: true})
    }
    return null;
  }

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
        refreshState={state}
        onFooterRefresh={loadMore}
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
