import React, { FC } from "react";

import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styles
import { css } from "@linaria/core";
import { InfoText, PrimaryText, SecondaryText } from "../../commonStyles";
import { mb12, mb2, mb28, mr4 } from "@assets/styles/atomic";

const button = css`
  height: 37px;
  width: 100%;
  margin-bottom: 12px;
`;
//#endregion

type Props = {
  sum: number | string;
  percent: number;
  leftovers: number | string;
};

const ParticipantLeftovBody: FC<Props> = ({ sum, percent, leftovers }) => {
  return (
    <>
      <InfoText className={mb12}>NFT was successfully purchased 🎉</InfoText>
      <SecondaryText className={mb28}>
        Now you can vote for the resale price. If the vote is passed, the NFT
        will be listed for the resale
      </SecondaryText>
      <SecondaryText className={mb12}>
        If not all your funds were spent during the buyout, then you can
        withdraw the leftovers
      </SecondaryText>
      <GradientBorderButton className={button}>
        - Withdraw leftovers
      </GradientBorderButton>
      <Row className={mb2}>
        <SecondaryText className={mr4}>Your funds:</SecondaryText>
        <PrimaryText className={mr4}>
          {percent}% / {sum}
        </PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
      <Row className={mb28}>
        <SecondaryText className={mr4}>Your leftovers:</SecondaryText>
        <PrimaryText className={mr4}>{leftovers}</PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
    </>
  );
};

export default ParticipantLeftovBody;
