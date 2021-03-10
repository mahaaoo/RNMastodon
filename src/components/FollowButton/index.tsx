import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Colors from "../../config/colors";
import Button from "../Button";

export enum FollowButtonStatus {
  UnFollow, // 关注
  Following, // 正在关注
  BothFollow, // 互相关注
}

interface FollowButtonProps {
  status: FollowButtonStatus;
}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const {status = FollowButtonStatus.UnFollow} = props;

  const content = useMemo(() => {
    switch(true) {
      case status === FollowButtonStatus.UnFollow: {
        return {
          buttonText: '关注',
          buttonStyle: {
            backgroundColor: Colors.defaultWhite,
            borderColor: Colors.theme,      
          },
          textStyle: {
            color: Colors.theme,
            fontSize: 18,
          },
        }
      }
      case status === FollowButtonStatus.Following: {
        return {
          buttonText: '正在关注',
          buttonStyle: {
            backgroundColor: Colors.theme,
            borderColor: Colors.theme,
          },
          textStyle: {
            color: Colors.defaultWhite,
            fontSize: 16,
          },
        }
      }
      case status === FollowButtonStatus.BothFollow: {
        return {
          buttonText: '互相关注',
          buttonStyle: {
            backgroundColor: Colors.theme,
            borderColor: Colors.theme,
          },
          textStyle: {
            color: Colors.defaultWhite,
            fontSize: 16,
          },
        }
      }
      default: {
        return {
          buttonText: '关注',
          buttonStyle: {
            backgroundColor: Colors.defaultWhite,
            borderColor: Colors.theme,      
          },
          textStyle: {
            color: Colors.theme,
            fontSize: 18,
          },
        }
      };
    }
 
  }, [status]);

  return (
    <Button 
      text={content.buttonText} 
      onPress={() => {}} 
      style={[styles.buttonContainer, content.buttonStyle]}
      textStyle={content.textStyle}
    />
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1,
    paddingHorizontal: 15,
  }
})

export default FollowButton;
