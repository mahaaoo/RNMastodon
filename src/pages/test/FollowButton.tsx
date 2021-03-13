import React, { useState, useMemo, useCallback, useRef,useEffect} from 'react';
import {TouchableOpacity, Text,StyleSheet, ActivityIndicator} from 'react-native';

enum FollowButtonStatus {
  UnFollow, // 关注
  Following, // 正在关注
  BothFollow, // 互相关注
  Requesting, // 正在请求
}

interface FollowButtonProps {

}

const FollowButton: React.FC<FollowButtonProps> = (props) => {
  const [buttonStatus, setButtonStatus] = useState(FollowButtonStatus.Requesting);
  const prevContentRef: any = useRef();

  useEffect(() => {
    setTimeout(() => {
      setButtonStatus(FollowButtonStatus.Following);
    }, 1000);
  }, []);


  const followSomeone = () => {
    setTimeout(() => {
      setButtonStatus(FollowButtonStatus.Following);
    }, 1000);
  }

  const unFollowSomeone = () => {
    setTimeout(() => {
      setButtonStatus(FollowButtonStatus.UnFollow);
    }, 1000);
  };

  useEffect(() => {
    prevContentRef.current = content;
  });

  const prevCount = prevContentRef.current;

  const content = useMemo(() => {
    // 当点击按钮发起请求的时候，保持Button当前状态，根据当前状态显示出不一样颜色的等待视图
    // 如果是第一次渲染，则返回一个默认状态
    if(buttonStatus === FollowButtonStatus.Requesting) {
      return prevCount || {
        buttonText: '请求中',
        buttonStyle: {
          backgroundColor: '#fff',
          borderColor: '#2593FC',      
        },
        textStyle: {
          color: '#2593FC',
          fontSize: 18,
        },
        indicatorColor: '#2593FC',
      }
    }
    
    switch(true) {
      case buttonStatus === FollowButtonStatus.UnFollow: {
        return {
          buttonText: '关注',
          buttonStyle: {
            backgroundColor: '#fff',
            borderColor: '#2593FC',      
          },
          textStyle: {
            color: '#2593FC',
            fontSize: 18,
          },
          indicatorColor: '#2593FC',
        }
      }
      case buttonStatus === FollowButtonStatus.Following: {
        return {
          buttonText: '正在关注',
          buttonStyle: {
            backgroundColor: '#2593FC',
            borderColor: '#2593FC',
          },
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
          indicatorColor: '#fff',
        }
      }
      case buttonStatus === FollowButtonStatus.BothFollow: {
        return {
          buttonText: '互相关注',
          buttonStyle: {
            backgroundColor: '#2593FC',
            borderColor: '#2593FC',
          },
          textStyle: {
            color: '#fff',
            fontSize: 16,
          },
          indicatorColor: '#fff',
        }
      }
      default: {
        return {
          buttonText: '关注',
          buttonStyle: {
            backgroundColor: '#fff',
            borderColor: '#2593FC',      
          },
          textStyle: {
            color: '#2593FC',
            fontSize: 18,
          },
          indicatorColor: '#2593FC',
        }
      };
    }
  }, [buttonStatus]);


  const handleOnPress = useCallback(() => {
    if(buttonStatus === FollowButtonStatus.UnFollow) {
      followSomeone();
    }
    if (buttonStatus === FollowButtonStatus.Following || buttonStatus === FollowButtonStatus.BothFollow) {
      unFollowSomeone();
    }

    setButtonStatus(FollowButtonStatus.Requesting);
  }, [buttonStatus]);

  return (
    <TouchableOpacity onPress={handleOnPress} style={[styles.main, content.buttonStyle]}>
      {
        buttonStatus == FollowButtonStatus.Requesting ? 
        <ActivityIndicator color={content.indicatorColor} /> : 
        <Text style={content.textStyle}>
          {content.buttonText}
        </Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1,
    width: 100,
  },
});

export default FollowButton;
