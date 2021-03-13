import React, { useCallback } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

import Avatar from "../../components/Avatar";
import { Timelines } from "../../config/interface";
import { dateToFromNow } from "../../utils/date";
import Colors from "../../config/colors";
import SplitLine from "../../components/SplitLine";
import Screen from "../../config/screen";
import { navigate } from "../../utils/rootNavigation";
import LineItemName from "./LineItemName";
import NinePicture from "../../components/NinePicture";
import { replaceContentEmoji } from "../../utils/emoji";
import HTMLContent from "../../components/HTMLContent";
import ToolBar from "./toolBar";
import WebCard from "./webCard";

interface HomeLineItemProps {
  item: Timelines,
  needToolbar?: boolean, // 是否显示转发工具条
}

const HomeLineItem: React.FC<HomeLineItemProps> = (props) => {
  const { item, needToolbar = true } = props;
  const showItem = item?.reblog || item ;

  const handleAvatar = useCallback(() => {
    navigate('User', { id: item?.account.id })
  }, [item]);

  const handleNavigation = useCallback(() => {
    needToolbar && navigate('StatusDetail', { id: item?.id });
  }, [needToolbar]);

  return(
    <TouchableOpacity activeOpacity={needToolbar? 0.2 : 1 } style={styles.main} key={showItem.id} onPress={handleNavigation}>
      {
        item?.reblog ?
        <View style={styles.status}>
          <Image source={require("../../images/turn_white.png")} style={{ width: 24, height: 22 }} />
          <Text style={{ color: Colors.defaultWhite, marginLeft: 2 }}>{item.account?.display_name || item.account?.username}  转发了</Text>
        </View>
        : null
      }
      {
        item?.in_reply_to_id ?
        <View style={styles.status}>
          <Image source={require("../../images/comment_white.png")} style={{ width: 20, height: 18 }} />
          <Text style={{ color: Colors.defaultWhite, marginLeft: 2 }}>{item.account?.display_name || item.account?.username}  转评了</Text>
        </View>
        : null
      }
      <View style={{ marginHorizontal: 15 }}>
        <View style={styles.title}>
          <TouchableOpacity style={styles.avatar} onPress={handleAvatar}>
            <Avatar url={showItem?.account?.avatar} />
          </TouchableOpacity>
          <View style={styles.name}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  <LineItemName displayname={showItem?.account?.display_name || showItem?.account?.username} emojis={showItem?.account?.emojis} />
                  <Text style={{ color: Colors.commonToolBarText, fontSize: 14 }} >
                    {`@${showItem?.account?.acct}`}
                  </Text>
                </Text>
              </View>
              <Image source={require("../../images/arrow_down.png")} style={{ width: 18, height: 18 }} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 13, color: Colors.commonToolBarText, marginTop: 8 }}>
                {dateToFromNow(showItem.created_at)}
                {
                  showItem?.application ?
                    <Text style={{ fontSize: 12 }}>
                      &nbsp;&nbsp;来自
                      <Text style={{ color: Colors.linkTagColor }}>
                        {showItem?.application?.name}
                      </Text>
                    </Text>
                  : <View />
                }
              </Text>
            </View>
          </View>
        </View>
        <HTMLContent html={replaceContentEmoji(showItem?.content, showItem?.emojis)} />
        <NinePicture imageList={showItem?.media_attachments} />        
        {
          showItem?.media_attachments?.length === 0 ? <WebCard card={showItem?.card} /> : null
        }
        <SplitLine start={0} end={Screen.width - 30} />
        {
          needToolbar ? 
          <ToolBar
            favourited={showItem?.favourited}
            favourites_count={showItem?.favourites_count}
            reblogs_count={showItem?.reblogs_count}
            replies_count={showItem?.replies_count}
          /> : null    
        }
      </View>
    </TouchableOpacity>
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
  }
})

export default HomeLineItem;