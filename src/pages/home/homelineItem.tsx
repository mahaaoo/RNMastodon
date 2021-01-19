import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import HTML from "react-native-render-html";

import Avatar from "../../components/Avatar";
import { Timelines } from "../../config/interface";
import { dateToFromNow } from "../../utils/date";
import Screen from "../../config/screen";


interface HomeLineItemProps {
  item: Timelines,
}

const tagsStyles = { 
  p: {
    fontSize: 16,
    lineHeight: 20
  }
};


const HomeLineItem: React.FC<HomeLineItemProps> = (props) => {
  const { item } = props;

  return(
    <View style={styles.main}>
      <View style={styles.title}>
        <View style={styles.avatar}>
          <Avatar url={item.account.avatar} />
        </View>
        <View style={styles.name}>
          <Text style={{ fontSize: 16 }}>{item.account.display_name}</Text>
          <Text style={{ marginTop: 8, color: "#999" }}>{dateToFromNow(item.created_at)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <HTML source={{ html: item.content }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 15 }} />
      </View>
      <View style={styles.tool}>
        <View style={styles.tool_item}>
          <Image source={require("../../images/turn.png")} style={{ width: 24, height: 22 }} />
          <Text style={{ fontSize: 16, color: '#9f9f9f', marginLeft: 2 }}>转嘟</Text>
        </View>
        <View style={styles.tool_item}>
          <Image source={require("../../images/comment.png")} style={{ width: 20, height: 20 }} />
          <Text style={{ fontSize: 16, color: '#9f9f9f', marginLeft: 2 }}>评论</Text>
        </View>
        <View style={styles.tool_item}>
          <Image source={require("../../images/like.png")} style={{ width: 22, height: 22 }} />
          <Text style={{ fontSize: 16, color: '#9f9f9f', marginLeft: 2 }}>赞</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  avatar: {
    paddingRight: 10,
  },
  name: {
    justifyContent: 'center',
  },
  content: {

  },
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
  }
})

export default HomeLineItem;