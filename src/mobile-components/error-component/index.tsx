import React from "react";

import Button, { ButtonSize } from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";

import { mb62 } from "@assets/styles/atomic";
import { primaryGreenButton } from "../no-crowds";
import { useMetaMask } from "metamask-react";
import { RINKEBY_ID } from "@app/constants/chain";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`;
//#endregion

const MobileError = ({ className }: ClassNameProps) => {
  const { status, connect, chainId, switchChain } = useMetaMask();

  const onClick = () => {
    if (status === 'notConnected') {
      connect();
    }

    if (status === 'unavailable') {
      window.open("https://metamask.io/");
    }

    if (status === 'connected' && chainId !== RINKEBY_ID) {
      switchChain(RINKEBY_ID);
    }
  };

  const renderText = () => {
    if (status === 'connected' && chainId !== RINKEBY_ID) {
      return 'Please change network to Rinkeby';
    } else {
      return 'Please connect wallet';
    }
  };

  return (
    <Root className={className}>
      <Container>
        <Title className={mb62}>{renderText()}</Title>
        <Button
          size={ButtonSize.small}
          className={primaryGreenButton}
          onClick={onClick}
        >
          Metamask
        </Button>
      </Container>
    </Root>
  );
};

export default MobileError;
