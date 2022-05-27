import React, { FC } from "react";

import { Row } from "@components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styled
import { css } from "@linaria/core";
import { PrimaryText, SecondaryText, InfoText } from "../../commonStyles";
import { mb12, mb2, mb28, mr4 } from "@assets/styles/atomic";

const button = css`
  height: 37px;
  width: 100%;
  margin-bottom: 12px;
`;
//#endregion

type Props = {
  sum: number | string;
  leftovers: number;
  onWithdraw?: () => void;
};
const NotPassedLeftovBody: FC<Props> = ({ sum, leftovers, onWithdraw }) => {
  return (
    <>
      <InfoText className={mb28}>Resale proposal did not pass</InfoText>
      <SecondaryText className={mb12}>
        If not all your funds were spent during the buyout, then you can
        withdraw the leftovers
      </SecondaryText>
      <GradientBorderButton className={button} onClick={onWithdraw}>
        - Withdraw leftovers
      </GradientBorderButton>
      <Row className={mb2}>
        <SecondaryText className={mr4}>Your funds:</SecondaryText>
        <PrimaryText className={mr4}>{sum}</PrimaryText>
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

export default NotPassedLeftovBody;
