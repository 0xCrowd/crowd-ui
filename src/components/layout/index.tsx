import React, { FC, PropsWithChildren, ReactElement } from 'react'
import Navbar from '../navbar/index';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  background-color: #141414;
`;
//#endregion

interface Props {
  balance: string;
  className?: string;
}

const Layout = ({ balance, children, className }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root className={className}>
      <Navbar balance={balance} />
      {children}
    </Root>
  )
}

export default Layout;
