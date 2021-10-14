import React, { FC } from 'react'
import Navbar from '../navbar/index';

//#region styles
import { styled } from '@linaria/react';

import background from '@assets/images/background.png';

interface RootProps {
  background: string
}

const Root = styled.div<RootProps>`
  background: ${({ background }) => `url(${background})`};
  height: 100%;
`;
//#endregion

const Layout: FC = ({ children }) => {
  return (
    <Root background={background}>
      <Navbar />
      {children}
    </Root>
  )
}

export default Layout;
