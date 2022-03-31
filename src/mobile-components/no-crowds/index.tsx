import React from "react";
import { Link } from "react-router-dom";

import Button, { ButtonSize } from "@components/button";

import { RouteNames } from "../../router/route-names";

//#region styles
import { styled } from "@linaria/react";
import { css, cx } from "@linaria/core";

import { mb24 } from "@assets/styles/atomic";
import { textPrimary } from "@assets/styles/constants";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  width: 70%;
  margin-top: 0;
  margin-bottom: 70px;
  font-size: 24px;
  font-weight: 600;
  color: ${textPrimary};
  text-align: center;
`;

const button = css`
  background: linear-gradient(0deg, #e6ff9f, #e6ff9f),
    linear-gradient(94.13deg, #00f0ff -27.4%, #ff1cf7 95.95%);
  border-radius: 20px;
  color: #263238;
`;

export const primaryGreenButton = css`
  background: linear-gradient(0deg, #c8ff2a, #c8ff2a),
    linear-gradient(94.13deg, #00f0ff -27.4%, #ff1cf7 95.95%);
  border-radius: 20px;
  color: #263238;
`;
//#endregion

type Props = {
  isMyCrowds: boolean;
  onCreateClick: () => void;
  className?: string;
};

const MobileNoCrowds = ({ isMyCrowds, onCreateClick, className }: Props) => {
  if (isMyCrowds) {
    return (
      <Root className={className}>
        <Title>You have not yet participated in any of the Crowds</Title>
        <Link to={RouteNames.INDEX}>
          <Button size={ButtonSize.small} className={cx(mb24, button)}>
            Join existing one
          </Button>
        </Link>
        <Button
          size={ButtonSize.small}
          className={cx(mb24, primaryGreenButton)}
          onClick={onCreateClick}
        >
          + Start a Crowd
        </Button>
      </Root>
    );
  }

  return (
    <Root className={className}>
      <Title>There is no Crowds yet!</Title>
      <Button size={ButtonSize.small} className={cx(mb24, primaryGreenButton)} onClick={onCreateClick}>
        + Start a Crowd
      </Button>
    </Root>
  );
};

export default MobileNoCrowds;
