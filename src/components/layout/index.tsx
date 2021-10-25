import React, { PropsWithChildren, ReactElement } from 'react';

import Navbar from '@components/navbar/index';
import ErrorComponent from '@components/error-component/index';

import { StateEnum } from '@enums/state-enum/index';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  background-color: #141414;
`;
//#endregion

interface Props {
  balance: string;
  blockChainState: StateEnum
  className?: string;
}

const Layout = ({ balance, blockChainState, children, className }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root className={className}>
      <Navbar balance={balance} />
      {blockChainState === StateEnum.Error ? <ErrorComponent /> : children}
    </Root>
  )
}

export default Layout;
