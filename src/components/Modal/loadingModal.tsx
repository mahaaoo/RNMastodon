import React from 'react';
import { View, ActivityIndicator, Text } from "react-native";
// @ts-ignore
import { Overlay } from 'teaset';
import BaseModal from './baseModal';

let LodingModalInstance: LodingFullModal | null = null;

export default class LodingFullModal extends BaseModal {
  constructor() {
    super()
    if (!LodingModalInstance) {
      LodingModalInstance = this;    
      this.init();
    }
    return LodingModalInstance;
  }

  static getInstance = () => {
    return new LodingFullModal()
  }

  renderComponent = () => {
    return (
      <Overlay.View
        modal={true}
        overlayOpacity={0}
        style={{ alignItems: 'center', justifyContent: 'center' }}
        ref={(v: any) => this.overlayView = v}
      >
        {this.renderContent()}
      </Overlay.View>
    );
  };

  renderContent = () => {
    return (
      <View style={{ 
        height: 130, 
        width: 150, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#e6e6e6', 
        borderRadius: 10,
        opacity: 0.9,
        elevation: 1.5,
        shadowColor:'#e3e3e3',
        shadowOffset:{ width: -1,height:1 },
        shadowOpacity: 1,  
      }}>
        <ActivityIndicator
          color={"#383838"}
          size={"large"}
        />
        <Text 
          style={{ 
            marginTop: 20,
            color: "#383838", 
            fontSize: 18, 
            fontWeight: 'bold'
          }}
        >加载中</Text>
      </View>
    )
  }
}
