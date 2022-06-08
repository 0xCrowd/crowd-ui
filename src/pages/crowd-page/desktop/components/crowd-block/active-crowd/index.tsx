import React, { ReactElement, useEffect, useState } from "react";
import { cx } from "@linaria/core";
import { toNumber } from "lodash";
import BigNumber from "bignumber.js";

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
  onOpenModal: (mode: ModalModeEnum) => void;
  myFound?: number;
  isOnExecution?: boolean;
  priceWei: BigNumber;
  collectedWei: BigNumber;
}

const ActiveCrowd = ({
  collected = 0,
  percentage,
  price = 0,
  myFound,
  isOnExecution,
  collectedWei,
  priceWei = new BigNumber(0),
  onOpenModal,
}: Props): ReactElement => {
  const { web3: { utils: { fromWei } }} = window;
  const [description, setDescription] = useState(
    <ExecutionDescription className={mb18} />
  );
  const [cardRemain, setCardRemain] = useState(0);
  const [cardButtons, setCardButtons] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (!isOnExecution) {
      setDescription(<ActiveDescription className={mb18} />);
      setCardButtons(<ButtonRow />);

      let remain = toNumber(fromWei(priceWei.minus(collectedWei).toString(), 'ether'));
      const remainBN = new BigNumber(remain);
      remain = remainBN.dp(4).toNumber();

      if (remain < 0) {
        remain = 0;
      }

      setCardRemain(remain);
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
          <GreenNumber>{collected}</GreenNumber>
          <SecondaryText>ETH Collected</SecondaryText>
        </Row>
      </PriceRow>
      <PriceRow className={mb28}>
        <Row className={priceRowContainer}>
          <BlueNumber>{cardRemain}</BlueNumber>
          <SecondaryText>ETH more required for a buyout</SecondaryText>
        </Row>
      </PriceRow>
      {cardRemain === 0 && <SecondaryText className={mb12}>Processing...</SecondaryText>}
      {!isOnExecution && cardRemain > 0 && cardButtons}
    </>
  );
};

export default ActiveCrowd;
