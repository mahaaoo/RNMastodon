import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import ToolBar from "../home/toolBar";
import HomeLineItem from "../home/homelineItem";

import Screen from "../../config/screen";
import Colors from "../../config/colors";

import { useRequest } from "../../utils/hooks";
import { getStatusesById } from "../../server/status";

const fetchStatusesById = (id: string) => {
  const fn = () => {
    return getStatusesById(id);
  }
  return fn;
}

interface StatusDetailProps extends StackScreenProps<any>{

}

const StatusDetail: React.FC<StatusDetailProps> = (props) => {
  const { data: statusDetail, run: getStatusesById } = useRequest(fetchStatusesById(props?.route?.params?.id), { manual: false, loading: true });

  if (!statusDetail) return null;

  return (
    <>
      <HomeLineItem item={statusDetail} needToolbar={false} />
      <View style={styles.toolBar}>
        <ToolBar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  toolBar: {
    position: 'absolute',
    height: 40 + Screen.bottom,
    width: Screen.width,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.defaultWhite
  }
})

export default StatusDetail
