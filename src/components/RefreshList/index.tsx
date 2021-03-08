import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList, FlatListProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

export enum RefreshState {
  Idle = 0,
  HeaderRefreshing = 1,
  FooterRefreshing = 2,
  NoMoreData = 3,
  Failure = 4,
}

interface RefreshListProps extends FlatListProps<any> {
  refreshState?: RefreshState,
  onHeaderRefresh?: () => void,
  onFooterRefresh?: () => void,
  data: Array<any>,

  footerContainerStyle?: StyleProp<ViewStyle>,
  footerTextStyle?: StyleProp<TextStyle>,

  footerRefreshingText?: string,
  footerFailureText?: string,
  footerNoMoreDataText?: string,
  canRefresh?: boolean,
  ref?: any,
}

const RefreshList: React.FC<RefreshListProps> = (props) => {
  const {
    refreshState,
    data,
    onFooterRefresh,
    onHeaderRefresh,
    footerContainerStyle,
    footerTextStyle,
    footerRefreshingText,
    footerFailureText,
    footerNoMoreDataText,
    canRefresh,
    ref,
    ...options
  } = props;

  const endReached = () => {
    if (shouldStartFooterRefreshing() && canRefresh) {
      onFooterRefresh && onFooterRefresh();
    }
  };

  const headerRefresh = () => {
    if (shouldStartHeaderRefreshing() && canRefresh) {
      onHeaderRefresh && onHeaderRefresh();
    }
  };

  const shouldStartHeaderRefreshing = () => {
    if (refreshState === RefreshState.HeaderRefreshing ||
      refreshState === RefreshState.FooterRefreshing) {
      return false;
    }

    return true;
  };

  const shouldStartFooterRefreshing = () => {
    if (data.length === 0) {
      return false;
    }

    return (refreshState === RefreshState.Idle);
  };

  const renderFooter = () => {
    let footer = null;

    const footerStyle = [styles.footerContainer, footerContainerStyle];
    const textStyle = [styles.footerText, footerTextStyle];

    switch (refreshState) {
      case RefreshState.Idle:
        footer = (<View style={footerStyle} />);
        break;
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity
            style={footerStyle}
            onPress={() => {
              onFooterRefresh && onFooterRefresh();
            }}
          >
            <Text style={textStyle}>{footerFailureText}</Text>
          </TouchableOpacity>
        );
        break;
      }
      case RefreshState.FooterRefreshing: {
        footer = (
          <View style={footerStyle} >
            <ActivityIndicator size="small" color="#888888" />
            <Text style={[textStyle, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
          </View>
        );
        break;
      }
      case RefreshState.NoMoreData: {
        if (data === null || data.length === 0) {
          footer = <View />; 
        } else {
          footer = (
            <View style={footerStyle} >
              <Text style={textStyle}>{footerNoMoreDataText}</Text>
            </View>
          );  
        }
        break;
      }
      default:
        break;
    }

    return footer;
  };

  return (
    <FlatList
      ref={ref}
      data={data}
      onEndReached={endReached}
      onRefresh={headerRefresh}
      refreshing={refreshState === RefreshState.HeaderRefreshing}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.1}
      keyExtractor={(item, index) => index.toString()}
      {...options}
    />
  );
};

RefreshList.defaultProps = {
  footerRefreshingText: '数据加载中…',
  footerFailureText: '点击重新加载',
  footerNoMoreDataText: '已加载全部数据',
  canRefresh: true,
  refreshState: RefreshState.Idle,
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555'
  }
});

export default RefreshList;
