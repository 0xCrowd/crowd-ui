import React, { ReactElement, useState, useMemo } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { toNumber } from "lodash";

import RaribleButton from "@app/components/rarible-button";
import GradientBorderButton from "@app/components/gradient-border-button";
import CrowdBlock from "./components/crowd-block";
import Proposals from "./components/proposals";
import HowWorks from "@app/components/how-works";

import { ModalModeEnum } from "@enums/modal-enum";
import { ProposalChoice } from "@app/enums/proposal-choice-enum";
import { toEth } from "@app/utils/toEth";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { mb28, media } from "@app/assets/styles/atomic";
import { lightGray } from "@app/assets/styles/constants";
import BigNumber from "bignumber.js";

const MainBlock = styled.div`
  display: flex;
  margin-bottom: 40px;

  ${media('mobile')} {
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

export interface CrowdPageProps {
  crowd: DetailedCrowd;
  crowdLoading: boolean;
  proposalsList: AdaptedProposal[];
  proposalsLoading: boolean;
  nftId: string;
  makeVote: (proposalId: number, choice: ProposalChoice, amount: string) => void;
  onOpenModal: (mode: ModalModeEnum) => void;
  onWithdrawWithoutAmount: () => void;
}

const DesktopPage = ({
  crowd,
  crowdLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  makeVote,
  onOpenModal,
  onWithdrawWithoutAmount
}: CrowdPageProps): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);

  const listingPrice = useMemo(() => {
    if (window.web3.utils) {
      const listingPriceWei = proposalsList.length ? proposalsList[0].priceWei.dp(0).toString() : '0';
      return new BigNumber(toEth(listingPriceWei)).dp(5).toNumber();
    }

    return 0;
  }, [window.web3.utils, proposalsList]);

  const foundsAfterResale = useMemo(() => {
    if (crowd && crowd.myFoundWei && proposalsList && proposalsList[0]) {
      const foundWei = proposalsList[0].priceWei.multipliedBy(crowd.myFoundWei).dividedBy(crowd.collectedWei).dp(0).toString();
      return new BigNumber(toEth(foundWei)).dp(5).toNumber();
    }

    return 0;
  }, [proposalsList, crowd]);

  if (crowdLoading || !crowd) {
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
            <UserName>{crowd?.name}</UserName>
            <RaribleButton tokenId={nftId} />
          </UserRow>
          <PreviewContainer>
            <Preview src={crowd?.media} alt="preview" />
          </PreviewContainer>
          {crowd?.status === "success" && (
            <>
              {!!crowd?.myFoundEth &&
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
                isParticipants={!!crowd?.myFoundEth}
                makeVote={makeVote}
                onOpenPriceModal={() => onOpenModal(ModalModeEnum.Price)}
              />
            </>
          )}
        </NftBlock>
        <Columns>
          <CrowdBlock
            id={crowd.id.toString()}
            type={crowd?.status || "failed"}
            collected={crowd?.collectedEth}
            percentage={crowd?.percentage}
            price={crowd?.priceEth}
            priceWei={crowd?.priceWei}
            collectedWei={crowd?.collectedWei}
            participant={crowd?.deposits}
            listingPrice={listingPrice}
            myFound={crowd?.myFoundEth}
            afterFounds={foundsAfterResale}
            leftovers={crowd?.leftovers}
            onOpenModal={onOpenModal}
            onWithdrawWithoutAmount={onWithdrawWithoutAmount}
            votingType={
              proposalsList.length ? proposalsList[0].type : "notVoting"
            }
            className={mb28}
            proposalsLoading={proposalsLoading}
          />
          <HowWorks collapsed={collapsed} onChange={setCollapsed} />
        </Columns>
      </MainBlock>
    </>
  );
};

export default DesktopPage;
