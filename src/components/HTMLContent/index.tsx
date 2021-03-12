import React from "react";
import { Image, Text } from "react-native";
import HTML from "react-native-render-html";
import Colors from "../../config/colors";

const defaultTagsStyles = { 
  p: {
    fontSize: 16,
    lineHeight: 20
  },
  a: {
    fontSize: 16,
    lineHeight: 20,
    textDecorationLine: 'none',
    color: Colors.linkTagColor,
  }
};

/**
 * TODO: 推文中文中的emoji，在转换为图片之后会单独占据一行
 * react-native-render-html在未来6.0版本会添加image的inline设置
 * https://github.com/meliorence/react-native-render-html/issues/428
 */

const renderer = {
	img: (htmlAttribs: any) => {
		return (
      <Image
        key={htmlAttribs.src}
        style={{height: 16, width: 16, alignSelf: 'stretch' }}
        resizeMode='contain'
        source={{uri: htmlAttribs.src}}
      />
    )
	},
};

interface HTMLContentProps {
  html: string,
  tagsStyles?: any
}

const HTMLContent: React.FC<HTMLContentProps> = (props) => {
  const {html, tagsStyles} = props;

  return (
    <HTML 
      source={{ html: html }} 
      tagsStyles={tagsStyles || defaultTagsStyles} 
      containerStyle={{ paddingVertical: 15 }}
      renderers={renderer}
      onLinkPress={(re, href) => {
        console.log(href);
      }}
    />
  )
}

export default HTMLContent;
