import React, { useState, useEffect, useMemo } from "react";
import { Text, ViewStyle, View } from "react-native";
import FastImage from "react-native-fast-image";

import { Emoji } from "../../config/interface";
import { replaceNameEmoji } from "../../utils/emoji";

interface LineItemNameProps {
  displayname: string,
  emojis: Array<Emoji>,
  fontSize?: number,
}

const LineItemName:  React.FC<LineItemNameProps> = (props) => {
  const { displayname, emojis, fontSize = 16 } = props;

  const name = useMemo(() => {
    return replaceNameEmoji(displayname, emojis);
  }, [displayname, emojis]);

  return (
    <>
      {name.map((item, index) => {
        return !item.image ? <Text style={{fontSize: fontSize, fontWeight: 'bold'}} key={`HomeLineItemName${index}`}>{item.text}</Text> : 
        <FastImage
          key={`HomeLineItemName${index}`}
          style={{ width: 15, height: 15 }}
          source={{
              uri: item.text,
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />      
      })}
    </>
  );
}

export default LineItemName;
