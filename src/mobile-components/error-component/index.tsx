import React from "react";

import Button, { ButtonSize } from "@app/components/button";

//#region styles
import { styled } from "@linaria/react";

import { mb62 } from "@assets/styles/atomic";
import { primaryGreenButton } from "../no-crowds";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 401px);
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
    </Root>
  );
};

export default MobileError;
