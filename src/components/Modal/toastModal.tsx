import React from 'react';
import { Pressable, Image, Text } from "react-native";
// @ts-ignore
import { Overlay } from 'teaset';
import Screen from "../../config/screen";

import BaseModal from './baseModal';

let ToastModalInstance: ToastModal | null = null;

export default class ToastModal extends BaseModal {
  constructor() {
    super()
    if (!ToastModalInstance) {
      ToastModalInstance = this;    
    }
    return ToastModalInstance;
  }

  static getInstance = () => {
    return new ToastModal()
  }

  message: string = "";
  imagePath: any;

  /**
   * 显示toast提示
   * msg 显示内容
   * level 0/1/2 正常/警告/错误
   * during 显示时间
   */
  show(msg: string, level: number = 0, during: number = 2000) {
    this.message = msg;

    switch(true) {
      case level === 0: 
        this.imagePath = require("../../images/widget/check.png");
        break;
      case level === 1:
        this.imagePath = require("../../images/widget/info.png");
        break;
      case level === 2:
        this.imagePath = require("../../images/widget/close.png");
        break; 
      default:
        this.imagePath = require("../../images/widget/check.png");
        break;
    }

    if (!this.getShow()) {
      super.init();
      super.open();
      setTimeout(() => {
        super.close();
      }, during);  
    }
  }

  renderComponent = () => {
    return (
      <Overlay.PullView
        overlayPointerEvents="none"
        side="top"
        modal={true}
        overlayOpacity={0}
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
        ref={(v: any) => this.overlayView = v}
      >
        {this.renderContent()}
      </Overlay.PullView>
    );
  };

  renderContent() {
    const marginTop = Screen.top;

    return (
      <Pressable 
        onPress={super.close}
        style={{ 
          alignItems: 'center',
          flexDirection: 'row', 
          marginTop: marginTop, 
          height: 50, 
          backgroundColor: 'white',
          borderRadius: 5,
          elevation: 1.5,
          shadowColor:'#e3e3e3',
          shadowOffset:{ width: -1,height:1 },
          shadowOpacity: 1,
        }}
      >
        <Image style={{ marginLeft: 20, width: 25, height: 25 }} source={this.imagePath} />
        <Text style={{ color: "black", fontSize: 18, paddingLeft: 10, paddingRight: 20 }}>{this.message}</Text>
      </Pressable>
    )
  }
}