import React, { ReactElement, useState, useEffect } from "react";

import Users from "./components/Users";
import ActiveCrowd from "./active-crowd";
import SuccessCrowd from "./success-crowd";
import LostCrowd from "./lost-crowd";

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
  yourFound?: number;
  yourPercent?: number;
  afterFounds?: number;
  leftovers?: number;
}

const CrowdBlock = ({
  collected,
  percentage,
  type,
  price,
  participant,
  listingPrice,
  yourPercent,
  yourFound,
  afterFounds,
  leftovers,
  onWithdraw,
}: Props): ReactElement => {
  const [background, setBackground] = useState<string>(activeDetail);
  const [title, setTitle] = useState("ACTIVE 🙌");
  const [content, setContent] = useState<JSX.Element | null>(
    <ActiveCrowd
      price={price}
      onWithdraw={onWithdraw}
      collected={collected}
      percentage={percentage}
      isParticipant={!!participant.length}
    />
  );

  useEffect(() => {
    switch (type) {
      case "complete":
        setBackground(successDetail);
        setTitle("SUCCESSFUL BUYOUT 😄");
        setContent(
          <SuccessCrowd
            votingType="noVoting"
            collected={collected}
            percentage={percentage}
            price={price}
            isParticipant={true}
            isLeftovers={!!leftovers}
            listingPrice={listingPrice}
            yourFound={yourFound}
            yourPercent={yourPercent}
            afterFounds={afterFounds}
            leftovers={leftovers}
          />
        );
        break;

      case "resolved":
        setBackground(resaleDetail);
        break;

      case "failed":
        setBackground(lostDetail);
        setTitle("UNSUCESSFUL BUYOUT 😔");
        setContent(
          <LostCrowd
            collected={collected}
            percentage={percentage}
            price={price}
          />
        );
        break;
    }
  }, [type]);

  return (
    <Root background={background}>
      <Title>{title}</Title>
      <ContentContainer>
        {content}
        <Users participants={[]} />
      </ContentContainer>
    </Root>
  );
};

export default CrowdBlock;
