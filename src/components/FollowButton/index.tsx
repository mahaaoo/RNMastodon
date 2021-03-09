import React from 'react';
import Colors from "../../config/colors";
import Button from "../Button";

const FollowButton: React.FC<{}> = () => {
  return (
    <Button 
      text={"关注"} 
      onPress={() => {}} 
      style={{ 
        height: 40, 
        paddingVertical: 8, 
        borderRadius: 20, 
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.theme,
        width: 90
      }}
      textStyle={{
        color: Colors.theme
      }}
    />
  )
}

export default FollowButton;
