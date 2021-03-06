import React from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import { Notification } from "../../config/interface";
import Screen from "../../config/screen";
import Colors from "../../config/colors";
import Avatar from "../../components/Avatar";
import HTML from "react-native-render-html";
import SplitLine from "../../components/SplitLine";
import LineItemName from "../home/LineItemName";
import { replaceContentEmoji } from "../../utils/emoji";

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

const renderer = {
	img: (htmlAttribs: any) => {
		return (
      <Image
        key={htmlAttribs.src}
        style={{height: 16, width: 16, alignSelf: 'stretch' }}
        resizeMode='contain'
        source={{uri: htmlAttribs.src}}
      />
    )
	},
};

interface MetionItemProps {
  item: Notification
}

const MetionItem: React.FC<MetionItemProps> = (props) => {
  const { item } = props;
  return(
    <View style={styles.main}>
      <View style={styles.content}>
        <View style={styles.typeLogo}>
          <Image source={require("../../images/notify_turn.png")} style={{ width: 25, height: 25 }} />
        </View>
        <View style={styles.right}>
          <Avatar url={item.account?.avatar} />
          <Text style={styles.username}>
            <LineItemName displayname={item.account?.display_name || item.account?.username} emojis={item.account?.emojis} fontSize={15} />
            <Text style={styles.explan}>&nbsp; 转发了你的嘟文</Text>
          </Text>
          <HTML 
              source={{ html: replaceContentEmoji(item.status?.content, item.status?.emojis) }} 
              tagsStyles={tagsStyles} 
              containerStyle={{ paddingVertical: 15 }}
              renderers={renderer}
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
    fontWeight: 'bold',
    fontSize: 15,
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

export default MetionItem;
