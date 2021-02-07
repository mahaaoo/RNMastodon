import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";

import SpacingBox from "../SpacingBox";

interface MediaImageProps {
  item: any,
}

const MediaImage: React.FC<MediaImageProps> = (props) => {
  const { item } = props;

  return (
    <FastImage
      key={item.id}
      style={{ flex: 1 }}
      source={{
          uri: item.url,
          priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />  
  )
}


interface NinePictureProps {
  imageList: Array<any>;
  height?: number;
}

const NinePicture: React.FC<NinePictureProps> = (props) => {
  const { imageList = [], height = 220 } = props;

  if(imageList.length === 0) return null; 

  if(imageList.length === 1) {
    return (
      <>
        <View style={{  height: height, flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}> 
          <MediaImage item={imageList[0]} />
        </View>
        <SpacingBox height={15} />
      </>    
    )
  }

  if(imageList.length === 2) {
    return (
      <>
        <View style={{ height: height, flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}> 
          <MediaImage item={imageList[0]} />
          <SpacingBox width={5} /> 
          <MediaImage item={imageList[1]} />
        </View>  
        <SpacingBox height={15} /> 
      </>
    )
  }

  if(imageList.length === 3) {
    return (
      <>
        <View style={{ height: height, flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}> 
          <MediaImage item={imageList[0]} />
          <SpacingBox width={5} /> 
          <View>
            <MediaImage item={imageList[1]} />
            <SpacingBox height={5} /> 
            <MediaImage item={imageList[2]} />
          </View>
        </View>
        <SpacingBox height={15} />
      </>    
    )
  }

  if(imageList.length === 4) {
    return (
      <>
        <View style={{ height: height, flexDirection: 'row', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' }}> 
          <View style={{ height: height, flex: 1 }}>
            <MediaImage item={imageList[0]} />
            <SpacingBox height={5} /> 
            <MediaImage item={imageList[1]} />
          </View>
          <SpacingBox width={5} /> 
          <View style={{ height: height, flex: 1 }}>
            <MediaImage item={imageList[2]} />
            <SpacingBox height={5} /> 
            <MediaImage item={imageList[3]} />
          </View>
        </View>  
        <SpacingBox height={15} /> 
      </>
    )
  }

  return null;
}

export default NinePicture;
