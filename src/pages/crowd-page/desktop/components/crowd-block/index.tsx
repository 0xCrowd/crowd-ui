import React, { ReactElement, useState, useEffect } from "react";
import BigNumber from "bignumber.js";

import HowWorks from "@app/components/how-works";
import Users from "./components/users";
import ActiveCrowd from "./active-crowd";
import SuccessCrowd from "./success-crowd";
import LostCrowd from "./lost-crowd";
import ResoldCrowd from "./resold-crowd";

import { ModalModeEnum } from "@app/enums/modal-enum";
import { CrowdStatusText } from "@app/enums/crowd-status/crowd-status";

//#region styles
import { styled } from "@linaria/react";
import { css } from '@linaria/core';

import { media } from "@app/assets/styles/atomic";

import activeDetail from "@assets/images/active_detail.png";
import successDetail from "@assets/images/success_detail.png";
import lostDetail from "@assets/images/lost_detail.png";
import resaleDetail from "@assets/images/resale_detail.png";

const backgrounds = {
  active: activeDetail,
  failed: lostDetail,
  success: successDetail,
  resolved: resaleDetail,
  on_execution: activeDetail,
};

type RootProps = {
  background: string;
};

const Root = styled.div<RootProps>`
  ${media("large")} {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 416px;
    height: 575px;
    padding: 28px 38px;
    background-image: ${({ background }) => `url(${background})`};
    background-size: cover;
  }
`;

const ContentContainer = styled.div`
  ${media("large")} {
    box-sizing: border-box;
    padding: 18px;
    width: 340px;
  }
`;

const Title = styled.p`
  margin: auto;
  margin-top: 0;
  margin-bottom: 18px;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
  text-transform: uppercase;

  ${media("mobile")} {
    margin-top: 25px;
    margin-bottom: 82px;
    text-align: center;
  }
`;

const howWorks = css`
  margin-bottom: 28px;

  ${media('large')} {
    display: none;
  }
`;
//#endregion

interface Props {
  type: CrowdStatusType;
  collected: number;
  percentage: number;
  price: number;
  onWithdraw?: () => void;
  participant: Deposits[];
  listingPrice?: number;
  myFound?: number;
  afterFounds?: number;
  leftovers?: number;
  onOpenModal: (mode: ModalModeEnum) => void;
  votingType: VotingType | "notVoting";
  priceWei: BigNumber;
  collectedWei: BigNumber;
  proposalsLoading: boolean;
  className?: string;
}

const CrowdBlock = ({
  collected,
  percentage,
  type,
  price,
  participant,
  listingPrice,
  myFound,
  afterFounds,
  leftovers,
  votingType,
  priceWei,
  collectedWei,
  proposalsLoading,
  onWithdraw,
  onOpenModal,
  className,
}: Props): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);

  const components = {
    success: (
      <SuccessCrowd
        votingType={votingType}
        price={price}
        listingPrice={listingPrice}
        myFound={myFound}
        afterFounds={afterFounds}
        leftovers={leftovers}
      />
    ),
    resolved: (
      <ResoldCrowd
        loading={proposalsLoading}
        myFound={myFound}
        price={price}
        resoldPrice={listingPrice || 0}
        onOpenModal={onOpenModal}
      />
    ),
    on_execution: (
      <ActiveCrowd
        price={price}
        onWithdraw={onWithdraw}
        collected={collected}
        percentage={percentage}
        myFound={myFound}
        onOpenModal={onOpenModal}
        isOnExecution
        priceWei={priceWei}
        collectedWei={collectedWei}
      />
    ),
    active: (
      <ActiveCrowd
        price={price}
        onWithdraw={onWithdraw}
        collected={collected}
        percentage={percentage}
        myFound={myFound}
        onOpenModal={onOpenModal}
        priceWei={priceWei}
        collectedWei={collectedWei}
      />
    ),
    failed: (
      <LostCrowd collected={collected} percentage={percentage} price={price} />
    ),
  };

  return (
    <Root
      background={backgrounds[type] || backgrounds.failed}
      className={className}
    >
      <Title>{CrowdStatusText[type] || CrowdStatusText.failed}</Title>
      <ContentContainer>
        {components[type] || components.failed}
        <HowWorks collapsed={collapsed} onChange={setCollapsed} className={howWorks} />
        <Users participants={participant} />
      </ContentContainer>
    </Root>
  );
};

export default CrowdBlock;
