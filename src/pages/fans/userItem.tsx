import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HTML from "react-native-render-html";

import { Account } from "../../config/interface";
import Avatar from "../../components/Avatar";
import Colors from "../../config/colors";
import LineItemName from '../home/LineItemName';
import SplitLine from "../../components/SplitLine";
import Screen from "../../config/screen";
import { replaceContentEmoji } from "../../utils/emoji";
import { navigate } from "../../utils/rootNavigation";

interface UserItemProps {
  item: Account
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

const UserItem: React.FC<UserItemProps> = (props) => {
  const { item } = props;

  const handleNavigation = useCallback(() => {
    navigate('User', { id: item.id })
  }, []);

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={styles.container}>
        <View>
          <Avatar url={item.avatar} />
        </View>
        <View style={styles.content}>
          <LineItemName displayname={item?.display_name || item?.username} emojis={item?.emojis} fontSize={18} />
          <Text style={styles.acct}><Text>@</Text>{item?.acct}</Text>
          <HTML source={{ html: replaceContentEmoji(item?.note, item?.emojis) }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 10 }} />
        </View>
      </View>
      <SplitLine start={0} end={Screen.width} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.defaultWhite,
    padding: 15
  },
  acct: {
    fontSize: 14,
    color: Colors.grayTextColor,
    marginTop: 5
  },
  content: {
    flex: 1,
    marginLeft: 15,
  }
});

export default UserItem;
