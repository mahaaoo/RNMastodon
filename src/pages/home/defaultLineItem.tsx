import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton, SkeletonLine, SkeletonAvatar, Fade } from "../../components/Skeleton";
import Screen from "../../config/screen";
import Colors from "../../config/colors";

const DefaultLineItem: React.FC<{}> = () => {
  return (
    <View style={[styles.main]}>
      <View style={{ marginHorizontal: 15 }}>
        <Skeleton animte={Fade}>
          <View style={{ flexDirection: 'row'}}>
            <View style={{ marginTop: 7 }}>
              <SkeletonAvatar height={45} width={45} />
            </View>
            <View style={{ marginLeft: 5}}>
              <SkeletonLine width={120} />
              <SkeletonLine width={75} />
            </View>
          </View>
          <SkeletonLine width={Screen.width - 30} />
          <SkeletonLine width={Screen.width * 0.5} />
          <SkeletonLine width={Screen.width * 0.8} />
        </Skeleton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    marginBottom: 10,
    width: Screen.width
  },
})

export default DefaultLineItem;
