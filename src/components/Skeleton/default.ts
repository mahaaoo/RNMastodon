import { StyleSheet } from 'react-native';

const defaultColor = '#F2F2F2';

const styles = StyleSheet.create({
  line: {
    overflow: 'hidden',
  },
  avatar: {
    overflow: 'hidden',
  },
  shine: {
    backgroundColor: "white",
    height: "100%",
    opacity: 0.5,
    width: "40%",
  },
  shineOver: {
    position: 'absolute',
    backgroundColor: "white",
    height: "100%",
    opacity: 0.5,
    width: "15%",
  }
})


export {
  styles,
  defaultColor
}