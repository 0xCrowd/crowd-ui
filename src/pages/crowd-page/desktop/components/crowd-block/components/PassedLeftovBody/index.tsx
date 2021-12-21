import React, { FC } from "react";

import { Row } from "@components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styled
import { css } from "@linaria/core";
import { PrimaryText, SecondaryText, InfoText } from "../../commonStyles";
import { mb12, mb2, mb28, mr4 } from "@assets/styles/atomic";
import PriceBock, { PriceBlockEnum } from "../PriceBlock";

const button = css`
  height: 37px;
  width: 100%;
  margin-bottom: 12px;
`;
//#endregion

type Props = {
  sum: number | string;
  percent: number;
  afterSum: number;
  listingPrice: number;
  leftovers: number;
};
const PassedLeftovBody: FC<Props> = ({
  sum,
  percent,
  afterSum,
  listingPrice,
  leftovers,
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
