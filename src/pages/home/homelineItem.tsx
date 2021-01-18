import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HTML from "react-native-render-html";

import Avatar from "../../components/Avatar";
import { Timelines } from "../../config/interface";
import { dateToFromNow } from "../../utils/date";



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
          <Text>{item.account.display_name}</Text>
          <Text>{dateToFromNow(item.created_at)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <HTML source={{ html: item.content }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 10 }} />
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
  },
  avatar: {
    paddingRight: 10,
    paddingTop: 15,
  },
  name: {
    justifyContent: 'center'
  },
  content: {

  }
})

export default HomeLineItem;