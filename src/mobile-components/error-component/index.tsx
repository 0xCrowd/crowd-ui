import React from "react";

import Button, { ButtonSize } from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";

import { mb62 } from "@assets/styles/atomic";
import { primaryGreenButton } from "../no-crowds";

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
  return (
    <Root className={className}>
      <Container>
        <Title className={mb62}>Please connect wallet</Title>
        <Button
          size={ButtonSize.small}
          className={primaryGreenButton}
          onClick={() => {
            window.open("https://metamask.io/");
          }}
        >
          Metamask
        </Button>
      </Container>
    </Root>
  );
};

export default MobileError;
