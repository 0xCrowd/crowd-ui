import React, { FC, PropsWithChildren, ReactElement } from 'react'
import Navbar from '../navbar/index';

//#region styles
import { styled } from '@linaria/react';

import background from '@assets/images/background.png';

interface RootProps {
  background: string
}

const Root = styled.div<RootProps>`
  background: ${({ background }) => `url(${background})`};
  background-size: cover;
`;
//#endregion

interface Props {
  balance: string;
  className?: string;
}

const Layout = ({ balance, children, className }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root background={background} className={className}>
      <Navbar balance={balance} />
      {children}
    </Root>
  )
}

export default Layout;
