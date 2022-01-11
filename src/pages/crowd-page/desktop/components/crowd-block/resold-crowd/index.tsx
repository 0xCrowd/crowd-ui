import React, { ReactElement, useEffect, useState } from "react";
import { cx } from "@linaria/core";

import PercentBar from "@app/components/percent-bar";
import PriceBock, { PriceBlockEnum } from ".././components/PriceBlock";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";
import ActiveDescription from ".././components/ActiveDescription";

import { ModalModeEnum } from "../../../../index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mb18, mr4, mb2, mb28, mb12, w100 } from "@assets/styles/atomic";
import { blueText, successText } from "@app/assets/styles/constants";
import { PrimaryText, SecondaryText } from ".././commonStyles";

const GreenNumber = styled.p`
  margin: 0;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${successText};
`;

const BlueNumber = styled.p`
  margin: 0;
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: ${blueText};
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
  price: string | number;
  onWithdraw?: () => void;
  onOpenModal: (mode: ModalModeEnum) => void;
  myFound?: number;
}

const ResoldCrowd = ({
  price = 0,
  myFound,
  onOpenModal,
}: Props): ReactElement => {
  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
      <SecondaryText className={mb12}>
        Now you can vote for the resale price. If the vote is passed, the NFT
        will be listed for the resale
      </SecondaryText>
      <GradientBorderButton
        className={cx(mb12, w100)}
        onClick={() => onOpenModal(ModalModeEnum.Withdraw)}
      >
        - Withdraw funds
      </GradientBorderButton>
      <Row className={mb28}>
        <SecondaryText className={mr4}>Your funds after resale:</SecondaryText>
        <PrimaryText className={mr4}>{myFound}</PrimaryText>
        <SecondaryText>ETH</SecondaryText>
      </Row>
    </>
  );
};

export default ResoldCrowd;
