import React from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import { Notification } from "../../config/interface";
import Screen from "../../config/screen";
import Colors from "../../config/colors";
import Avatar from "../../components/Avatar";
import SplitLine from "../../components/SplitLine";
import LineItemName from "../home/LineItemName";
import { replaceContentEmoji } from "../../utils/emoji";
import HTMLContent from '../../components/HTMLContent';

const tagsStyles = {
  p: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.grayTextColor
  },
  a: {
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: 'none',
    color: Colors.grayTextColor
  }
};

interface FavouriteItemProps {
  item: Notification
}

const FavouriteItem: React.FC<FavouriteItemProps> = (props) => {
  const { item } = props;
  return(
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.typeLogo}>
          <Image source={require("../../images/like_fill.png")} style={{ width: 24, height: 22 }} />
        </View>
        <View style={styles.right}>
          <Avatar url={item.account?.avatar} />
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
            <LineItemName displayname={item.account?.display_name || item.account?.username} emojis={item.account?.emojis} fontSize={15} />
            <Text style={styles.explan}>&nbsp; 喜欢了你的嘟文</Text>
          </Text>
          <HTMLContent 
            html={replaceContentEmoji(item.status?.content, item.status?.emojis)}
            tagsStyles={tagsStyles}
          />
        </View>
      </View>
      <SplitLine start={0} end={Screen.width} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.defaultWhite,
    width: Screen.width
  },
  content: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  username: {
    marginTop: 10,
  },
  explan: {
    fontWeight: 'normal',
    fontSize: 15,
  },
  typeLogo: {
    width: 50,
    alignItems: 'flex-end',
    marginRight: 10
  },
  right: {
    flex: 1,
  },

})

export default FavouriteItem;
