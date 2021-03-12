import React, { useMemo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Colors from "../../config/colors";

interface ToolBarProps {
  favourited: boolean,
  favourites_count: number,
  reblogs_count: number,
  replies_count: number,
}

const ToolBar: React.FC<ToolBarProps> = (props) => {
  const {favourited, favourites_count, reblogs_count, replies_count} = props;

  const likeUrl = useMemo(() => {
    return favourited ? require("../../images/like_fill.png") : require("../../images/like.png");
  }, [favourited]);

  return (
    <>
      <View style={styles.tool}>
        <View style={styles.tool_item}>
          <Image source={require("../../images/turn.png")} style={{ width: 24, height: 22 }} />
          <Text style={styles.tool_title}>{ reblogs_count === 0 ? '转发' : reblogs_count }</Text>
        </View>
        <View style={styles.tool_item}>
          <Image source={require("../../images/comment.png")} style={{ width: 20, height: 18 }} />
          <Text style={styles.tool_title}>{ replies_count === 0 ? '转评' :  replies_count}</Text>
        </View>
        <View style={styles.tool_item}>
          <Image source={likeUrl} style={{ width: 20, height: 20 }} />
          <Text style={styles.tool_title}>{favourites_count === 0 ? '赞' : favourites_count}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tool: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tool_item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tool_title: {
    fontSize: 16, 
    color: Colors.commonToolBarText, 
    marginLeft: 2,
  }
})

export default ToolBar;
