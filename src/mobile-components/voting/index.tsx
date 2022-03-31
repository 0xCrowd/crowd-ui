import React from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

import {
  ProposalProps,
  LiveTitle,
  VoteStatusBlock,
  PriceBlock,
  VotedDescription,
  SuccessVoteBadge,
  FailedVoteBadge,
  FailedTitle,
  Description,
  SuccessTitle,
} from "../../components/voting/index";
import { Row } from "@app/components/row/Row";
import Timer from "@app/components/timer";
import Button, { ButtonSize } from "@app/components/button";

import { CrowdStatusText } from "../../enums/crowd-status/crowd-status";

//#region styles
import { styled } from "@linaria/react";
import { css, cx } from "@linaria/core";

import { mb24, mb44 } from "@app/assets/styles/atomic";
import { pink, successText, textPrimary } from "@app/assets/styles/constants";
import { SKELETON_BACKGROUND } from "@app/pages/crowd-page/mobile/components/skeleton";
import { primaryGreenButton } from "../no-crowds";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin-top: 25x;
  margin-bottom: 64px;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
`;

const Text = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 24px;
  color: ${textPrimary};
  margin-bottom: 8px;
`;

const Hr = styled.div`
  width: 230px;
  height: 1px;
  background: ${successText};
`;

const blueButton = css`
  width: 304px
  margin-bottom: 18px
  font-size: 12px;
  font-weight: 400;
  background: linear-gradient(
      0deg,
      rgba(0, 240, 255, 0.2),
      rgba(0, 240, 255, 0.2)
    ),
    #202527;
  border: 1px solid #00f0ff;
`;

const greenButton = css`
  width: 45%;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${successText};
  background: linear-gradient(0deg, #232927, #232927);
`;

const pinkButton = css`
  width: 45%;
  font-size: 12px;
  font-weight: 400;
  border: 1px solid ${pink};
  background: linear-gradient(0deg, #36243c, #36243c);
`;

const contentWidth = css`
  width: 304px;
`;

const successHr = css`
  width: 97px;
`;
//#endregion

const SKELETONS = [
  { width: 229, height: 18, mb: 64 },
  { width: 171, height: 24, mb: 24 },
  { width: 202, height: 48, mb: 44 },
  { width: 250, height: 24, mb: 32 },
  { width: 200, height: 44, mb: 24 },
  { width: 208, height: 36, mb: 0 },
];

type Props = Pick<
  ProposalProps,
  "type" | "against" | "time" | "price" | "voted" | "votingPower"
> & {
  loading: boolean;
  isParticipant: boolean;
  status: DetailedCrowd["status"];
};

const VotingMobile = ({
  type,
  time,
  price,
  voted,
  against,
  votingPower,
  isParticipant,
  status,
  loading,
}: Props) => {
  if (loading) {
    <Root>
      {SKELETONS.map(({ width, height, mb }, index) => (
        <SkeletonLoader
          key={index}
          width={width}
          height={height}
          background={SKELETON_BACKGROUND}
          style={{ marginBottom: mb }}
        />
      ))}
    </Root>;
  }

  const Buttons = () => (
    <>
      <Button size={ButtonSize.small} className={blueButton}>
        Agree with avarege
      </Button>
      <Row justify="space-between" className={contentWidth}>
        <Button size={ButtonSize.small} className={pinkButton}>
          Vote against selling
        </Button>
        <Button size={ButtonSize.small} className={greenButton}>
          Suggest your price
        </Button>
      </Row>
    </>
  );

  const renderFooter = () => {
    switch (type) {
      case "liveVoteAgainst":
        return <FailedVoteBadge />;

      case "liveVoteFor":
        return <SuccessVoteBadge votingPower={votingPower} />;

      default:
        <Buttons />;
    }
  };

  const renderBody = () => {
    switch (type) {
      case "noSuccess":
        return (
          <>
            <FailedTitle className={cx(contentWidth, mb24)} />
            <Row>
              <VoteStatusBlock type={type} />
            </Row>
            <Text>You can start a new proposal</Text>
            <Hr className={cx(mb24, successHr)} />
          </>
        );

      case "success":
        return (
          <>
            <SuccessTitle className={mb24} />
            <Row className={mb44}>
              <VoteStatusBlock type={type} />
            </Row>
            <Text>Listing Price</Text>
            <Hr className={cx(mb24, successHr)} />
            <PriceBlock price={price} className={mb24} />
            <Description className={mb44}>
              The NFT has been listed by the results of voting
            </Description>
          </>
        );

      default:
        return (
          <>
            <LiveTitle className={mb24} />
            <Timer time={time} className={mb44} />
            <Text>Current average voting price</Text>
            <Hr className={mb24} />
            <PriceBlock price={price} className={mb24} />
            <VotedDescription voted={voted} against={against} />
            {isParticipant && renderFooter()}
          </>
        );
    }
  };
  return (
    <Root>
      <Title>{CrowdStatusText[status]}</Title>
      {type && renderBody()}
      {(type === "noSuccess" || !type) && (
        <Button
          size={ButtonSize.small}
          className={cx(primaryGreenButton, contentWidth, mb44)}
        >
          Start voting on the resale price
        </Button>
      )}
    </Root>
  );
};

export default VotingMobile;
