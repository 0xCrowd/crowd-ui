import Button from "@app/components/button";
import React from "react";
import MobileProposal from "../mobile-proposal";

//#region styles
import { css } from '@linaria/core';

const buttonContainer = css`
  height: 44px;
  width: 100%;
  border-radius: 30px;
`;

const button = css`
  height: 40px;
  width: calc(100% - 4px);
  border-radius: 30px;
`;
//#endregion

const ProposalTab = () => {
  return (
    <div>
      <Button className={buttonContainer}>Start new proposal</Button>
      <MobileProposal />
      <MobileProposal />
      <MobileProposal />
      <MobileProposal />
      <MobileProposal />
    </div>
  );
};

export default ProposalTab;
