import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import FollowButton from "./FollowButton";

interface TestProps extends StackScreenProps<any>{

}

const Test: React.FC<TestProps> = (props) => {
  return (
    <View style={styles.main}>
      <FollowButton />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  }
})

export default Test;
