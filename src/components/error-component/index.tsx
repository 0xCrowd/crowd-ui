import React from "react";
import { useMetaMask } from "metamask-react";

import GradientBorderButton from "../gradient-border-button";
import { ButtonSize } from "../button";

//#region styles
import { styled } from '@linaria/react';
import { RINKEBY_ID } from "@app/constants/chain";


const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50%;
`;

const Title = styled.p`
  margin-bottom: 84px;
  font-weight: bold;
  font-size: 36px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #fff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 304px;
  height: 52px;
  background: linear-gradient(97.56deg, #00F0FF 8.07%, #FF1CF7 91.93%);
  border-radius: 10px;
  cursor: pointer;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 302px;
  height: 50px;
  background: #263238;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
`;

//#endregion

const ErrorComponent = ({ className }: ClassNameProps) => {
  const { connect, status, chainId, switchChain } = useMetaMask();

  const renderButton = () => {
    if (status === 'unavailable') {
      return <Container>
        <Link href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
          MetaMask
        </Link>
      </Container>
    }

    if (status === 'notConnected' || status === 'connecting') {
      return <GradientBorderButton disabled={status === 'connecting'} size={ButtonSize.large} onClick={connect}>Connect</GradientBorderButton>
    }

    if (status === 'connected' && chainId !== RINKEBY_ID) {
      return <GradientBorderButton size={ButtonSize.large} onClick={() => switchChain(RINKEBY_ID)} >Change Network</GradientBorderButton>
    }
  };

  const renderText = () => {
    if (status === 'connected' && chainId !== RINKEBY_ID) {
      return 'Please Change a network to Rinkeby';
    } else {
      return 'Please connect a wallet';
    }
  };

  return (
    <Root className={className}>
      <Title>
        {renderText()}
      </Title>
      {renderButton()}
    </Root>
  )
};

export default ErrorComponent;
