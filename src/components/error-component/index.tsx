import React from "react";

//#region styles
import { styled } from '@linaria/react';

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

const ErrorComponent = () => (
  <Root>
    <Title>
      PLEASE INSTALL METAMASK
    </Title>
    <Container>
      <Link href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        INSTALL
      </Link>
    </Container>
  </Root>
);

export default ErrorComponent;
