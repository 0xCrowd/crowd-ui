import React, { ReactElement } from "react";
import { cx } from "@linaria/core";

import PercentBar from "@app/components/percent-bar";
import PriceBock, { PriceBlockEnum } from ".././components/PriceBlock";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mb18, mb28, mb12, w100, mb4 } from "@assets/styles/atomic";
import { pink, successText } from "@app/assets/styles/constants";
import { InfoText, PrimaryText, SecondaryText } from ".././commonStyles";

const GreenNumber = styled.p`
  margin: 0;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${successText};
`;

const Text = styled.p`
  margin: 0;
  font-weight: 800;
  font-size: 12px;
  line-height: 18px;
  color: ${pink};
`;

const PriceRow = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const priceRowContainer = css`
  align-items: flex-end;
`;
//#endregion

interface Props {
  collected: number;
  percentage: number;
  price: string | number;
  onWithdraw?: () => void;
  isParticipant?: boolean;
  sum?: number;
  percent?: number;
}

const LostCrowd = ({ collected, percentage, price, isParticipant, sum, percent }: Props): ReactElement => {
  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
      <InfoText className={mb4}>Someone has already bought NFT</InfoText>
      <PercentBar percent={percentage} className={mb18} />
      <PriceRow className={mb28}>
        <Row className={priceRowContainer}>
          <GreenNumber>{collected}</GreenNumber>
          <SecondaryText>ETH Collected</SecondaryText>
        </Row>
      </PriceRow>
      {isParticipant && (
        <>
          <Text className={mb12}>You should withdraw your funds if you have added any</Text>
          <GradientBorderButton className={cx(mb28, w100)}>
            + Add Funds
          </GradientBorderButton>
          <Row className={mb28}>
            <SecondaryText>Your funds:</SecondaryText>
            <PrimaryText>{sum}</PrimaryText>
            <SecondaryText>/</SecondaryText>
            <PrimaryText>{percent}</PrimaryText>
            <SecondaryText>ETH</SecondaryText>
          </Row>
        </>
      )}
    </>
  );
};

export default LostCrowd;
