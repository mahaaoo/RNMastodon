import React from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import { Notification } from "../../config/interface";
import Screen from "../../config/screen";
import Colors from "../../config/colors";
import Avatar from "../../components/Avatar";
import FollowButton from "../../components/FollowButton";
import SplitLine from "../../components/SplitLine";
import LineItemName from "../home/LineItemName";

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
          <Text style={styles.username}>
            <LineItemName displayname={item.account?.display_name || item.account?.username} emojis={item.account?.emojis} fontSize={15} />
            <Text style={styles.explan}>&nbsp; 喜欢了你的嘟文</Text>
          </Text>
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
    fontWeight: 'bold',
    fontSize: 15,
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
