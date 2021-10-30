import React, { PropsWithChildren, ReactElement } from 'react';

import Navbar from '@components/navbar/index';
import ErrorComponent from '@components/error-component/index';

import { StateEnum } from '@enums/state-enum/index';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

const Root = styled.div`
  background-color: #141414;
`;

const navbar = css`
  @media (max-width: 420px) {
    display: none;
  }
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
      <Navbar balance={balance} className={navbar} />
      {blockChainState === StateEnum.Error ? <ErrorComponent /> : children}
    </Root>
  )
}

export default Layout;
