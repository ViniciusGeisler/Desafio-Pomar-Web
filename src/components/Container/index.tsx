import React from 'react';

import { Container as CustomContainer } from './styles';

const Container: React.FC = ({ children }) => {
  return (
    <CustomContainer>
      {children}
    </CustomContainer>
  );
}

export default Container;