import React from 'react';
import { View } from 'react-native';

interface SkeletonProps {
  animte: React.ComponentType,
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { children, animte } = props;

  const SkeletonContainer = animte || View;
  

  return (
    <SkeletonContainer>
      {children}
    </SkeletonContainer>
  )
}
