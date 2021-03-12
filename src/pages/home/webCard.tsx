import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import Screen from '../../config/screen';
import Colors from "../../config/colors";
import { Card } from "../../config/interface";


interface WebCardProps {
  card: Card
}

const WebCard: React.FC<WebCardProps> = (props) => {
  const { card } = props;
  if (!card || !card.image) return <></>;

  return (
    <View style={styles.container}>
      <FastImage
        style={{ flex: 1 }}
        source={{
            uri: card?.image,
            priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{ flex: 2 }}>
        <View style={{ marginHorizontal: 8, marginVertical: 5 }}> 
          <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold'}}>{card?.title}</Text>
        </View>
        <View style={{ flex: 1, marginHorizontal: 8 }}> 
          <Text ellipsizeMode={"tail"}>{card?.description}</Text>
        </View>
        <View style={{ marginHorizontal: 8, marginVertical: 5 }}> 
          <Text numberOfLines={1} style={{ color: Colors.grayTextColor }}>{card?.url}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: Screen.onePixel,
    borderColor: Colors.defaultLineGreyColor,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 15,
    height: 110,
  }
})

export default WebCard;
