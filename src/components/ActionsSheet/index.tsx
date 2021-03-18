import React, { useRef, useEffect } from 'react';
import { Modal, View, Animated, Easing, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import Screen from "../../config/screen";
import Colors from "../../config/colors";

interface ActionsSheetProps {
  show: boolean;
  clickBlank?: () => void;
  defalutHeight?: number;
  title?: string;
  description?: string;
}

const ActionsSheet: React.FC<ActionsSheetProps> = (props) => {
  const { show, clickBlank, defalutHeight = 300, children, title, description } = props;
  const offsetY = useRef(new Animated.Value(-defalutHeight)).current;
  
  useEffect(() => {
    if(show) {
      Animated.timing(offsetY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();  
    } else {
      Animated.timing(offsetY, {
        toValue: -defalutHeight,
        duration: 200,
        useNativeDriver: false,
      }).start();  
    }
  }, [show]);

  return (
    <Modal visible={show} animationType={"fade"} transparent={true}>
      <TouchableOpacity onPress={() => { clickBlank && clickBlank() }} style={styles.container}>
        <Animated.View 
          style={[styles.content, { bottom: offsetY, height: defalutHeight }]}
        >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{  alignItems: 'center' }}>
            <View style={{ width: 80, height: 8, borderRadius: 4, backgroundColor: Colors.defaultLineGreyColor, marginVertical: 10 }} /> 
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{title}</Text>
            <Text style={{ fontSize: 14, color: Colors.grayTextColor, textAlign: 'center', marginVertical: 10 }}>{description}</Text>
            {children}
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:'rgba(0, 0, 0, 0.3)',
  },
  content: {
    width: Screen.width,
    backgroundColor: '#fff',
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 10,
  }
})

export default ActionsSheet;