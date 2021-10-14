import React, { FC } from 'react'
import Navbar from '../navbar/index';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  background: #000;
  height: 100%;
`;
//#endregion

const Layout: FC = ({ children }) => {
  return (
    <Root>
      <Navbar />
      {children}
    </Root>
  )
}

export default Layout;
