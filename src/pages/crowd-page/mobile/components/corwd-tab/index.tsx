import React, { useState } from "react";
import BigNumber from "bignumber.js";

import Users from "@app/pages/crowd-page/desktop/components/crowd-block/components/users";
import HowWorks from "@app/components/how-works";
import ActiveCrowd from "@app/pages/crowd-page/desktop/components/crowd-block/active-crowd/index";

import { CrowdStatusText } from '@enums/crowd-status/crowd-status';
import { ModalModeEnum } from "@app/enums/modal-enum";

//#region styles
import { styled } from "@linaria/react";

import { textPrimary } from "@app/assets/styles/constants";

import { mb28 } from "@app/assets/styles/atomic";

const Title = styled.p`
  margin-top: 25px;
  margin-bottom: 82px;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  color: ${textPrimary};
  text-transform: capitalize;
  text-align: center;
`;
//#endregion

type Props = {
  status: CrowdStatusType;
  participants: IDeposits[];
  collected: number;
  percentage: number;
  price: number;
  onWithdraw?: () => void;
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
};

const CrowdTab = ({ status, participants, price, collected, percentage, myFound, priceWei, collectedWei, onOpenModal, onWithdraw }: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Title>{CrowdStatusText[status]}</Title>
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
      <HowWorks collapsed={collapsed} onChange={setCollapsed} className={mb28} />
      <Users participants={participants} />
    </>
  );
};

export default CrowdTab;
