import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import HTML from "react-native-render-html";
import FastImage from "react-native-fast-image";

import Avatar from "../../components/Avatar";
import { Timelines } from "../../config/interface";
import { dateToFromNow } from "../../utils/date";
import Colors from "../../config/colors";
import SplitLine from "../../components/SplitLine";
import Screen from "../../config/screen";

interface HomeLineItemProps {
  item: Timelines,
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

const HomeLineItem: React.FC<HomeLineItemProps> = (props) => {
  const { item } = props;

  const showItem = item.reblog || item ;

  return(
    <View style={styles.main} key={showItem.id}>
      {
        item.reblog ?
        <View style={styles.status}>
          <Image source={require("../../images/turn_white.png")} style={{ width: 24, height: 22 }} />
          <Text style={{ color: Colors.defaultWhite, marginLeft: 2 }}>{item.account.display_name}  转发了</Text>
        </View>
        : null
      }
      {
        item.in_reply_to_id ?
        <View style={styles.status}>
          <Image source={require("../../images/comment_white.png")} style={{ width: 20, height: 18 }} />
          <Text style={{ color: Colors.defaultWhite, marginLeft: 2 }}>{item.account.display_name}  转评了</Text>
        </View>
        : null
      }
      <View style={{ marginHorizontal: 15 }}>
        <View style={styles.title}>
          <View style={styles.avatar}>
            <Avatar url={showItem.account.avatar} />
          </View>
          <View style={styles.name}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }} numberOfLines={1} ellipsizeMode="tail">{showItem.account.display_name}
                  <Text style={{ color: Colors.commonToolBarText, fontWeight:'normal', fontSize: 14 }} >{`@${showItem.account.acct}`}</Text>
                </Text>
              </View>
              <Image source={require("../../images/arrow_down.png")} style={{ width: 18, height: 18 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: Colors.commonToolBarText, marginTop: 8 }}>
                {dateToFromNow(showItem.created_at)}
                {
                  showItem.application ?
                    <Text style={{ fontSize: 12 }}>
                      &nbsp;&nbsp;来自
                      <Text style={{ color: Colors.linkTagColor }}>
                        {showItem.application.name}
                      </Text>
                    </Text>
                  : <View />
                }
              </Text>
            </View>
          </View>
        </View>
        <HTML source={{ html: showItem.content }} tagsStyles={tagsStyles} containerStyle={{ paddingVertical: 15 }} />
        {
          // showItem.card && showItem.card?.image?.length > 0 ?
          // <Pressable onPress={() => {}}>
          //   <FastImage
          //     style={{ width: Screen.width - 30, minHeight: 220, maxHeight: 250, borderRadius: 8 }}
          //     source={{
          //         uri: showItem.card.image,
          //         priority: FastImage.priority.normal,
          //     }}
          //     resizeMode={FastImage.resizeMode.cover}
          //   />     
          //   <Image source={require("../../images/play.png")} style={styles.play_button} />
          // </Pressable>
          // : null
        }
        {
          showItem.media_attachments?.map(media =>
            <FastImage
              style={{ width: Screen.width - 30, minHeight: 220, maxHeight: 250, borderRadius: 8 }}
              source={{
                  uri: media.url,
                  priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />      
          )
        }
        <SplitLine start={0} end={Screen.width - 30} />
        <View style={styles.tool}>
          <View style={styles.tool_item}>
            <Image source={require("../../images/turn.png")} style={{ width: 24, height: 22 }} />
            <Text style={styles.tool_title}>转发</Text>
          </View>
          <View style={styles.tool_item}>
            <Image source={require("../../images/comment.png")} style={{ width: 20, height: 18 }} />
            <Text style={styles.tool_title}>转评</Text>
          </View>
          <View style={styles.tool_item}>
            <Image source={require("../../images/like.png")} style={{ width: 22, height: 22 }} />
            <Text style={styles.tool_title}>赞</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  status: {
    alignSelf:'flex-start', 
    paddingHorizontal: 10,
    flexDirection: 'row', 
    backgroundColor: Colors.timelineStatusTag, 
    marginTop: 15, 
    height: 30 , 
    borderTopRightRadius: 15, 
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    marginBottom: 10,
    width: Screen.width
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
    flex: 1,
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
  },
  tool_title: {
    fontSize: 16, 
    color: Colors.commonToolBarText, 
    marginLeft: 2,
  },
  play_button: {
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    width: 55, 
    height: 55
  }
})

export default HomeLineItem;