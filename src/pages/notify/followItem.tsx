import React, { useCallback } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Notification, Relationship } from "../../config/interface";
import Screen from "../../config/screen";
import Colors from "../../config/colors";
import Avatar from "../../components/Avatar";
import FollowButton from "../../components/FollowButton";
import SplitLine from "../../components/SplitLine";
import { navigate } from "../../utils/rootNavigation";

interface FollowItemProps {
  item: Notification,
  relationships: Relationship[] | undefined,
}

const FollowItem: React.FC<FollowItemProps> = (props) => {
  const { item, relationships } = props;

  const handleNavigation = useCallback(() => {
    navigate('User', { id: item.account?.id })
  }, [item]);

  return(
    <TouchableOpacity style={styles.main} onPress={handleNavigation}>
      <View style={styles.content}>
        <View style={styles.typeLogo}>
          <Image source={require("../../images/notify_user.png")} style={{ width: 28, height: 22 }} />
        </View>
        <View style={styles.right}>
          <Text style={styles.username}>{item.account?.display_name || item.account?.username}<Text style={styles.explan}>&nbsp; 关注了你</Text></Text>
          <View style={styles.users}>
            <View style={styles.avatarContainer}>
              <Avatar url={item.account?.avatar} size={55} />
              <FollowButton 
                relationships={relationships}
                id={item.account?.id}
              />
            </View>
            <Text style={styles.displayName}>{item.account?.display_name || item.account?.username}</Text>
            <Text style={styles.acct}>@{item.account?.acct}</Text>
          </View>
        </View>
      </View>
      <SplitLine start={0} end={Screen.width} />
    </TouchableOpacity>
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
  users: {
    borderWidth: Screen.onePixel,
    borderColor: Colors.defaultLineGreyColor,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  acct: {
    fontSize: 16,
    color: Colors.grayTextColor,
  }
})

export default FollowItem;
