import React, { FC } from "react";
import { toNumber } from "lodash";
import BigNumber from "bignumber.js";

import Button from "../button";
import { Row } from "../row/Row";
import Timer from "../timer";

import { fixedRound } from "@app/utils/round";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import {
  bgDark,
  bgLightGray,
  pink,
  successText,
  textGray,
  textPrimary,
} from "@app/assets/styles/constants";
import { mb24, mb28, mb36, mb45 } from "@app/assets/styles/atomic";

import okIcon from "@assets/images/ok.svg";
import dissIcon from "@assets/images/diss.svg";
import eth from "@app/assets/images/eth_wh.png";

const Root = styled.div`
  box-sizing: border-box;
  width: 640px;
  padding: 36px;
  background-color: ${bgDark};
  border-radius: 5px;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: ${textPrimary};
`;

const SubTitle = styled.span`
  color: ${successText};
`;

const SubTitlePink = styled.span`
  color: ${pink};
`;

export const Description = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${textGray};
`;

const MainBlock = styled.div`
  display: flex;
  height: 92px;
  background-color: ${bgLightGray};
  border-radius: 10px;
`;

const LeftColumn = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 196px;
  padding: 22px 15px 22px 24px;
  border-right: 1px solid ${successText};
`;

const ColumnText = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: ${textPrimary};
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const PriceLabel = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: ${textGray};
`;

const Price = styled.p`
  margin: 0;
  margin-right: 4px;
  font-weight: 600;
  font-size: 24px;
  color: ${textPrimary};
  line-height: 24px;
`;

const greenButton = css`
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${successText};
`;

const pinkButton = css`
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${pink};
`;

const blueButton = css`
  font-size: 12px;
  font-weight: 400;
  border: 1px solid #00f0ff;
`;

const smallMainBlock = css`
  height: 50px;
`;

const smallLeft = css`
  padding: 12px 12px 12px 24px;
`;

const smallRight = css`
  padding: 12px 12px 12px 35px;
`;

const greenLabel = css`
  color: ${successText};
`;

const SmallPriceLabel = styled.p`
  margin: 0;
  font-size: 8px;
  font-weight: 600;
  color: ${textGray};
`;

const SmallPrice = styled.p`
  margin: 0;
  margin-right: 4px;
  font-weight: 600;
  font-size: 18px;
  color: ${successText};
`;

const LostLabel = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: ${pink};
`;

const VoteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  margin-left: 12px;
  background-color: ${bgLightGray};
  border-radius: 5px;
`;

const VoteStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 180px;
  background-color: ${bgLightGray};
  border-radius: 5px;
`;

const Status = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 28px;
  color: #999;
`;

const DescriptionLarge = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: ${textGray};
`;

const EthLogo = styled.img`
  width: 44px;
  height: 44px;
  margin-right: 10px;
`;
//#endregion

export type ProposalProps = {
  type?:
    | "liveNotVote"
    | "liveVoteFor"
    | "liveVoteAgainst"
    | "success"
    | "noSuccess";
  isParticipants?: boolean;
  price?: BigNumber;
  time: string;
  loading: boolean;
  makeVote: (option: number, amount: string) => void;
  className?: string;
  votingPower: string;
  voted?: number;
  against?: number;
};

export const SuccessTitle = ({ className }: ClassNameProps) => (
  <Title className={className}>
    <SubTitle>Resale proposal passed</SubTitle>
  </Title>
);

export const FailedTitle = ({ className }: ClassNameProps) => (
  <Title className={className}>
    <SubTitlePink>Resale proposal did not pass</SubTitlePink>
  </Title>
);

export const LiveTitle = ({ className }: ClassNameProps) => (
  <Title className={className}>
    Voting is <SubTitle>LIVE</SubTitle>
  </Title>
);

export const VoteStatusBlock = ({ type }: { type: ProposalProps["type"] }) => {
  return (
    <>
      <VoteStatus>
        <Status>Voting is over</Status>
      </VoteStatus>
      <VoteIcon>
        <img src={type === "success" ? okIcon : dissIcon} />
      </VoteIcon>
    </>
  );
};

export const PriceBlock = ({
  price,
  className,
}: { price: ProposalProps["price"] } & ClassNameProps) => (
  <Row className={className}>
    <EthLogo src={eth} alt="eth logo" />
    <Row alignItems="flex-end">
      <Price>
        {price
          ? window.web3.utils.fromWei(price.dp(4).toString(), "ether")
          : ""}
      </Price>
      <PriceLabel>ETH</PriceLabel>
    </Row>
  </Row>
);

export const VotedDescription = ({
  against,
  voted,
}: {
  against: ProposalProps["against"];
  voted: ProposalProps["voted"];
}) => (
  <>
    <Description>{against}% of votes against the selling</Description>
    <Description className={mb24}>{voted}% voted</Description>
  </>
);

export const SuccessVoteBadge = ({
  votingPower,
}: {
  votingPower: ProposalProps["votingPower"];
}) => (
  <MainBlock className={smallMainBlock}>
    <LeftColumn className={smallLeft}>
      <ColumnText className={greenLabel}>Your vote:</ColumnText>
    </LeftColumn>
    <RightColumn className={smallRight}>
      <Row alignItems="flex-end">
        <SmallPrice>{votingPower}</SmallPrice>
        <SmallPriceLabel>ETH</SmallPriceLabel>
      </Row>
    </RightColumn>
  </MainBlock>
);

export const FailedVoteBadge = () => (
  <MainBlock className={smallMainBlock}>
    <LeftColumn className={smallLeft}>
      <ColumnText className={greenLabel}>Your vote:</ColumnText>
    </LeftColumn>
    <RightColumn className={smallRight}>
      <LostLabel>against the sale</LostLabel>
    </RightColumn>
  </MainBlock>
);

const Voting: FC<ProposalProps> = ({
  isParticipants,
  type = "liveNotVote",
  price,
  time,
  loading,
  makeVote,
  votingPower,
  voted,
  against,
  className,
}) => {
  const {
    web3: {
      utils: { fromWei },
    },
  } = window;
  const OverFooter = (
    <Row justify="end">
      <VoteStatusBlock type={type} />
    </Row>
  );

  const getProposalTitle = () => {
    switch (type) {
      case "success":
        return <SuccessTitle />;

      case "noSuccess":
        return <FailedTitle />;

      default:
        return <LiveTitle />;
    }
  };

  const getParticipantFooter = () => {
    switch (type) {
      case "liveNotVote":
        return (
          <Row justify="space-between">
            <Button
              loading={loading}
              className={pinkButton}
              onClick={() => makeVote(1, "null")}
            >
              Vote against selling
            </Button>
            <Button
              loading={loading}
              className={blueButton}
              onClick={() => makeVote(0, "same")}
            >
              Agree with avarege
            </Button>
            <Button
              loading={loading}
              className={greenButton}
              onClick={() => makeVote(0, "1000")}
            >
              Suggest your price
            </Button>
          </Row>
        );

      case "liveVoteFor":
        return <SuccessVoteBadge votingPower={votingPower} />;

      case "liveVoteAgainst":
        return <FailedVoteBadge />;

      case "success":
        return OverFooter;

      case "noSuccess":
        return OverFooter;

      default:
        return null;
    }
  };

  const getNotParticipantFooter = () => {
    switch (type) {
      case "success":
        return OverFooter;

      case "noSuccess":
        return OverFooter;

      default:
        return null;
    }
  };

  const getDescription = () => {
    switch (type) {
      case "success":
        return (
          <DescriptionLarge className={mb36}>
            The NFT has been listed by the results of voting
          </DescriptionLarge>
        );

      case "noSuccess":
        return (
          <DescriptionLarge className={mb45}>
            The majority did not vote or voted against the resale
          </DescriptionLarge>
        );

      default:
        return <VotedDescription against={against} voted={voted} />;
    }
  };

  return (
    <Root className={className}>
      <Row
        alignItems="flex-start"
        justify="space-between"
        className={type === "noSuccess" || type === "success" ? mb28 : ""}
      >
        {getProposalTitle()}
        {type !== "noSuccess" && type !== "success" && <Timer time={time} />}
      </Row>
      {getDescription()}
      {type !== "noSuccess" && (
        <MainBlock className={isParticipants || type === "success" ? mb24 : ""}>
          <LeftColumn>
            <ColumnText>
              {type !== "success"
                ? "Current average voting price"
                : "Listing price"}
            </ColumnText>
          </LeftColumn>
          <RightColumn>
            <PriceBlock price={price} />
          </RightColumn>
        </MainBlock>
      )}
      {isParticipants ? getParticipantFooter() : getNotParticipantFooter()}
    </Root>
  );
};

export default Voting;
