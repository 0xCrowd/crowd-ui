import React, { ReactElement, useState } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { toNumber } from "lodash";

import RaribleButton from "@app/components/rarible-button";
import GradientBorderButton from "@app/components/gradient-border-button";
import CrowdBlock from "./components/crowd-block";
import Proposals from "./components/proposals";
import HowWorks from "@app/components/how-works";

import { ModalModeEnum } from "../index";
import { fixedRound } from "@app/utils/round";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { mb28, media } from "@app/assets/styles/atomic";
import { lightGray } from "@app/assets/styles/constants";

const MainBlock = styled.div`
  display: flex;
  margin-bottom: 40px;

  ${media("mobile")} {
    display: none;
  }
`;

const NftBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 640px;
  margin-right: 94px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const UserName = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #fff;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 640px;
  margin-bottom: 48px
  border-radius: 30px;
  background-color: ${lightGray};
`;

const Preview = styled.img`
  max-width: 640px;
  max-height: 640px;
  margin-bottom: 18px;
  margin: auto;
  background-size: contain;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: column;
`;

const proposalVisible = css`
  ${media("mobile")} {
    display: none;
  }
`;

const proposalButton = css`
  width: 100%;
  height: 48px;
  margin-bottom: 36px;
`;
//#endregion

interface Props {
  adaptedCrowd: DetailedCrowd;
  daoLoading: boolean;
  proposalsList: AdaptedProposal[];
  proposalsLoading: boolean;
  nftId: string;
  makeVote: (proposalStream: string, option: number, amount: string) => void;
  onOpenModal: (mode: ModalModeEnum) => void;
}

const DesktopPage = ({
  adaptedCrowd,
  daoLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  makeVote,
  onOpenModal,
}: Props): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);

  const listingPrice = proposalsList.length ? fixedRound(toNumber(proposalsList[0].price), 2) : 0;
  const fraction = (adaptedCrowd?.myFound || 0) / +adaptedCrowd?.price

  console.log(fraction, 'fr');

  if (daoLoading) {
    return (
      <MainBlock>
        <SkeletonLoader
          width={640}
          height={640}
          background="linear-gradient(0deg,#263238,#263238)"
          style={{ marginRight: 40 }}
        />
        <SkeletonLoader
          height={578}
          width={416}
          background="linear-gradient(0deg,#263238,#263238)"
        />
      </MainBlock>
    );
  }
  return (
    <>
      <MainBlock>
        <NftBlock>
          <UserRow>
            <UserName>{adaptedCrowd?.name}</UserName>
            <RaribleButton tokenId={nftId} />
          </UserRow>
          <PreviewContainer>
            <Preview src={adaptedCrowd?.media} alt="preview" />
          </PreviewContainer>
          {adaptedCrowd?.status === "complete" && (
            <>
              {!!adaptedCrowd?.myFound &&
                ((proposalsList[0] && proposalsList[0].type !== "success") ||
                  !proposalsList[0]) && (
                  <GradientBorderButton
                    className={proposalButton}
                    onClick={() => onOpenModal(ModalModeEnum.Proposal)}
                    disabled={
                      !!proposalsList.find(
                        (elem) =>
                          elem.type === "liveNotVote" ||
                          elem.type === "liveVoteFor" ||
                          elem.type === "liveVoteAgainst"
                      )
                    }
                  >
                    Put the NFT on sale
                  </GradientBorderButton>
                )}
              <Proposals
                proposals={proposalsList}
                loading={proposalsLoading}
                isParticipants={!!adaptedCrowd?.myFound}
                makeVote={makeVote}
              />
            </>
          )}
        </NftBlock>
        <Columns>
          <CrowdBlock
            type={adaptedCrowd?.status || "failed"}
            collected={adaptedCrowd?.collected}
            percentage={adaptedCrowd?.percentage}
            price={adaptedCrowd?.price}
            participant={adaptedCrowd?.deposits}
            listingPrice={listingPrice}
            myFound={adaptedCrowd?.myFound}
            afterFounds={listingPrice * fraction}
            leftovers={adaptedCrowd?.leftovers}
            onOpenModal={onOpenModal}
            votingType={
              proposalsList.length ? proposalsList[0].type : "notVoting"
            }
            className={mb28}
          />
          <HowWorks collapsed={collapsed} onChange={setCollapsed} />
        </Columns>
      </MainBlock>
    </>
  );
};

export default DesktopPage;
