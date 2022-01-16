import React, { ReactElement, useEffect, useState } from "react";
import { cx } from "@linaria/core";
import { toNumber } from "lodash";

import PercentBar from "@app/components/percent-bar";
import PriceBock, { PriceBlockEnum } from "../components/price-block";
import { Row } from "@app/components/row/Row";
import GradientBorderButton from "@app/components/gradient-border-button";
import ActiveDescription from "../components/active-description";
import ExecutionDescription from "../components/execution-description";

import { ModalModeEnum } from "@app/enums/modal-enum";

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
  price: number;
  onWithdraw?: () => void;
  onOpenModal: (mode: ModalModeEnum) => void;
  myFound?: number;
  isOnExecution?: boolean;
}

const ActiveCrowd = ({
  collected = 0,
  percentage,
  price = 0,
  myFound,
  isOnExecution,
  onOpenModal,
}: Props): ReactElement => {
  const [remain, setRemain] = useState(0);
  const [description, setDescription] = useState(
    <ExecutionDescription className={mb18} />
  );
  const [cardCollected, setCardCollected] = useState(collected + price);
  const [cardRemain, setCardRemain] = useState(0);
  const [cardButtons, setCardButtons] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (!isOnExecution) {
      setDescription(<ActiveDescription className={mb18} />);
      setCardCollected(collected);
      setCardButtons(<ButtonRow />);

      let fixedNumber = 0;
      if (collected === 0) {
        fixedNumber = price.toString().length - 2;
      } else {
        fixedNumber = collected.toString().length - 2;
      }

      let remain = toNumber((price - collected).toFixed(fixedNumber));

      if (remain < 0) {
        remain = 0;
      }

      setRemain(remain);
    }
  }, [isOnExecution, collected, price]);

  const ButtonRow = () => {
    return myFound ? (
      <>
        <Row className={mb12}>
          <GradientBorderButton
            className={mr4}
            onClick={() => onOpenModal(ModalModeEnum.Eth)}
          >
            + Add Funds
          </GradientBorderButton>
          <GradientBorderButton
            onClick={() => onOpenModal(ModalModeEnum.Withdraw)}
          >
            - Withdraw
          </GradientBorderButton>
        </Row>
        <Row className={mb28}>
          <SecondaryText className={mr4}>Your funds:</SecondaryText>
          <PrimaryText className={mr4}>{myFound}</PrimaryText>
          <SecondaryText>ETH</SecondaryText>
        </Row>
      </>
    ) : (
      <GradientBorderButton
        className={cx(mb28, w100)}
        onClick={() => onOpenModal(ModalModeEnum.Eth)}
      >
        + Add Funds
      </GradientBorderButton>
    );
  };

  return (
    <>
      <PriceBock type={PriceBlockEnum.primary} price={price} className={mb28} />
      {description}
      <PercentBar percent={percentage} className={mb18} />
      <PriceRow className={mb2}>
        <Row className={priceRowContainer}>
          <GreenNumber>{cardCollected}</GreenNumber>
          <SecondaryText>ETH Collected</SecondaryText>
        </Row>
      </PriceRow>
      <PriceRow className={mb28}>
        <Row className={priceRowContainer}>
          <BlueNumber>{cardRemain}</BlueNumber>
          <SecondaryText>ETH more required for a buyout</SecondaryText>
        </Row>
      </PriceRow>
      {!isOnExecution && cardButtons}
    </>
  );
};

export default ActiveCrowd;
