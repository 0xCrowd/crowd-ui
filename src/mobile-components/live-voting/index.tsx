import React from "react";

import Button from "@app/components/button";
import { LiveTitle } from "@app/components/voting";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { mb44 } from "@assets/styles/atomic";
import { textPrimaryDark } from "@app/assets/styles/constants";

const Root = styled.div`
  box-sizing: border-box;
  width: 250px;
  height: 150px;
  padding: 18px 40px;
  border-radius: 30px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.03) -13.74%,
    rgba(0, 0, 0, 0.03) 110.26%
  );
`;

const button = css`
  width: 156px;
  height: 48px;
  background: #ffffff !important;
  border-radius: 15px;
  color: ${textPrimaryDark};
  font-weight: 600;
  font-size: 18px;
`;
//#endregion

const LiveVoting = ({ className }: ClassNameProps) => {
  return (
    <Root className={className}>
      <LiveTitle className={mb44} />
      <Button className={button}>Go to voting</Button>
    </Root>
  );
};

export default LiveVoting;
