import React, { FC } from "react";

import { Row } from "@components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styled
import { css } from "@linaria/core";
import { PrimaryText, SecondaryText, InfoText } from "../../commonStyles";
import { mb12, mb2, mb28, mr4 } from "@assets/styles/atomic";
import PriceBock, { PriceBlockEnum } from "../price-block";

const button = css`
  height: 37px;
  width: 100%;
  margin-bottom: 12px;
`;
//#endregion

type Props = {
  sum: number | string;
  afterSum: number;
  listingPrice: number;
  leftovers: number;
  onWithdraw?: () => void;
};
const PassedLeftovBody: FC<Props> = ({
  sum,
  afterSum,
  listingPrice,
  leftovers,
  onWithdraw
}) => {
  return (
    <>
      <PriceBock
        type={PriceBlockEnum.success}
        price={listingPrice}
        className={mb28}
      />
      <InfoText className={mb28}>
        The NFT was listed for the resale by voting 🤑
      </InfoText>
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
      <Row className={mb2}>
        <SecondaryText className={mr4}>Your funds after resale:</SecondaryText>
        <PrimaryText className={mr4}>{afterSum}</PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
      <Row className={mb12}>
        <SecondaryText className={mr4}>Your leftovers:</SecondaryText>
        <PrimaryText className={mr4}>{leftovers}</PrimaryText>
        <SecondaryText className={mr4}>ETH</SecondaryText>
      </Row>
    </>
  );
};

export default PassedLeftovBody;
