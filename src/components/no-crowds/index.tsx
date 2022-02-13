import React from "react";
import { Link } from "react-router-dom";

import { ButtonSize } from "@components/button";
import { Row } from "@components/row/Row";
import GradientBorderButton from "@components/gradient-border-button";

import { RouteNames } from "../../router/route-names";

//#region styles
import { styled } from "@linaria/react";
import { cx } from "@linaria/core";

import { mb62, media, mr52, ml52 } from "@assets/styles/atomic";

const Root = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 36px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #fff;

  ${media("mobile")} {
    font-size: 24px;
    height: 37px;
  }
`;
//#endregion

type Props = {
  isMyCrowds: boolean;
  onCreateClick: () => void;
  className?: string;
};

const NoCrowds = ({ isMyCrowds, className, onCreateClick }: Props) => {
  if (isMyCrowds) {
    return (
      <Root className={className}>
        <Row className={mb62}>
          <Title>You have not yet participated in any of the Crowds</Title>
        </Row>
        <Row>
          <Link to={RouteNames.INDEX}>
            <GradientBorderButton size={ButtonSize.large}>
              Join existing one
            </GradientBorderButton>
          </Link>
          <Title className={cx(ml52, mr52)}>or</Title>
          <GradientBorderButton size={ButtonSize.large} onClick={onCreateClick}>
            Start a new one
          </GradientBorderButton>
        </Row>
      </Root>
    );
  }

  return (
    <Root className={className}>
      <Title className={mb62}>There is no Crowds yet!</Title>
      <GradientBorderButton size={ButtonSize.large} onClick={onCreateClick}>
        Start a new one
      </GradientBorderButton>
    </Root>
  );
};

export default NoCrowds;
