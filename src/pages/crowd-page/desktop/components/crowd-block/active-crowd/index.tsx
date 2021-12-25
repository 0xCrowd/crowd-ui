import React, { ReactElement, useEffect, useState } from "react";
import { cx } from "@linaria/core";

import PercentBar from "@app/components/percent-bar";
import PriceBock, { PriceBlockEnum } from ".././components/PriceBlock";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";
import ActiveDescription from ".././components/ActiveDescription";

import { ModalModeEnum } from '../../../../index';

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
  collected: number;
  percentage: number;
  price: string | number;
  onWithdraw?: () => void;
  onOpenModal: (mode: ModalModeEnum) => void;
  myFound?: number;
}

const ActiveCrowd = ({ collected = 0, percentage, price = 0, myFound, onOpenModal }: Props): ReactElement => {
  const [remain, setRemain] = useState(0);

  useEffect(() => {
    let fixedNumber = 0;
    if (collected === 0) {
      fixedNumber = price.toString().length - 2;
    } else {
      fixedNumber = collected.toString().length - 2
    }

    let remain = +(+price - collected).toFixed(fixedNumber);

    if (remain < 0) {
      remain = 0;
    }

    setRemain(remain);
  }, []);

  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
      <ActiveDescription className={mb18} />
      <PercentBar percent={percentage} className={mb18} />
      <PriceRow className={mb2}>
        <Row className={priceRowContainer}>
          <GreenNumber>{collected}</GreenNumber>
          <SecondaryText>ETH Collected</SecondaryText>
        </Row>
      </PriceRow>
      <PriceRow className={mb28}>
        <Row className={priceRowContainer}>
          <BlueNumber>{remain}</BlueNumber>
          <SecondaryText>ETH more required for a buyout</SecondaryText>
        </Row>
      </PriceRow>
      {myFound ? (
        <>
          <Row className={mb12}>
            <GradientBorderButton className={mr4} onClick={() => onOpenModal(ModalModeEnum.Eth)}>
              + Add Funds
            </GradientBorderButton>
            <GradientBorderButton onClick={() => onOpenModal(ModalModeEnum.Withdraw)}>- Withdraw</GradientBorderButton>
          </Row>
          <Row className={mb28}>
            <SecondaryText className={mr4}>Your funds:</SecondaryText>
            <PrimaryText className={mr4}>{myFound}</PrimaryText>
            <SecondaryText>ETH</SecondaryText>
          </Row>
        </>
      ) : (
        <GradientBorderButton className={cx(mb28, w100)} onClick={() => onOpenModal(ModalModeEnum.Eth)}>
          + Add Funds
        </GradientBorderButton>
      )}
    </>
  );
};

export default ActiveCrowd;
