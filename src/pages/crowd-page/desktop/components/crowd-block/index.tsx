import React, { ReactElement, useState, useEffect } from "react";

import Users from "./components/Users";
import ActiveCrowd from "./active-crowd";
import SuccessCrowd from "./success-crowd";
import LostCrowd from "./lost-crowd";

import { ModalModeEnum } from "../../../index";

//#region styles
import { styled } from "@linaria/react";

import activeDetail from "@assets/images/active_detail.png";
import successDetail from "@assets/images/success_detail.png";
import lostDetail from "@assets/images/lost_detail.png";
import resaleDetail from "@assets/images/resale_detail.png";

type RootProps = {
  background: string;
};

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 416px;
  height: 575px;
  padding: 28px 38px;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  padding: 18px;
  width: 340px;
`;

const Title = styled.p`
  margin: auto;
  margin-top: 0;
  margin-bottom: 18px;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
`;
//#endregion

interface Props {
  type: CrowdStatusType;
  collected: number;
  percentage: number;
  price: string | number;
  onWithdraw?: () => void;
  participant: IDeposits[];
  listingPrice?: number;
  myFound?: number;
  afterFounds?: number;
  leftovers?: number;
  onOpenModal: (mode: ModalModeEnum) => void;
  votingType: VotingType | 'notVoting';
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
  onWithdraw,
  onOpenModal,
  className,
}: Props): ReactElement => {
  const [background, setBackground] = useState<string>(lostDetail);
  const [title, setTitle] = useState("UNSUCESSFUL BUYOUT 😔");
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    console.log(type, 'type')
    switch (type) {
      case "complete":
        setBackground(successDetail);
        setTitle("SUCCESSFUL BUYOUT 😄");
        setContent(
          <SuccessCrowd
            votingType={votingType}
            price={price}
            listingPrice={listingPrice}
            myFound={myFound}
            afterFounds={afterFounds}
            leftovers={leftovers}
          />
        );
        break;

      case "resolved":
        setBackground(resaleDetail);
        setTitle("SUCCESSFUL RESALE 💸");
        break;

      case "on_execution":
        setBackground(activeDetail);
        setTitle("BUYOUT ⏳");
        setContent(
          <ActiveCrowd
            price={price}
            onWithdraw={onWithdraw}
            collected={collected}
            percentage={percentage}
            myFound={myFound}
            onOpenModal={onOpenModal}
          />
        );
      case "active":
        setBackground(activeDetail);
        setTitle("ACTIVE 🙌");
        setContent(
          <ActiveCrowd
            price={price}
            onWithdraw={onWithdraw}
            collected={collected}
            percentage={percentage}
            myFound={myFound}
            onOpenModal={onOpenModal}
          />
        );
        break;

      default:
        setContent(
          <LostCrowd
            collected={collected}
            percentage={percentage}
            price={price}
          />
        );
    }
  }, [type, votingType]);

  return (
    <Root background={background} className={className}>
      <Title>{title}</Title>
      <ContentContainer>
        {content}
        <Users participants={participant} />
      </ContentContainer>
    </Root>
  );
};

export default CrowdBlock;
