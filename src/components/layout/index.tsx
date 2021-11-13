import React, { PropsWithChildren, ReactElement } from 'react';
import { ToastContainer } from 'react-toastify';

import Navbar from '@components/navbar/index';
import ErrorComponent from '@components/error-component/index';

import { StateEnum } from '@enums/state-enum/index';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

const Root = styled.div`
  min-height: 100vh;
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Root>
  )
}

export default Layout;
