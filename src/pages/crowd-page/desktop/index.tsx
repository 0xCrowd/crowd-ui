import React, { ReactElement, useState, useMemo } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { toNumber } from "lodash";

import RaribleButton from "@app/components/rarible-button";
import GradientBorderButton from "@app/components/gradient-border-button";
import CrowdBlock from "./components/crowd-block";
import Proposals from "./components/proposals";
import HowWorks from "@app/components/how-works";

import { ModalModeEnum } from "@enums/modal-enum";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { mb28, media } from "@app/assets/styles/atomic";
import { lightGray } from "@app/assets/styles/constants";

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
  makeVote: (proposalStream: string, option: number, amount: string) => void;
  onOpenModal: (mode: ModalModeEnum) => void;
}

const DesktopPage = ({
  crowd,
  crowdLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  makeVote,
  onOpenModal,
}: CrowdPageProps): ReactElement => {
  const [collapsed, setCollapsed] = useState(true);

  const fraction = (crowd?.myFound || 0) / toNumber(crowd?.price);

  const listingPrice = useMemo(() => {
    if (window.web3.utils) {
      const listingPriceWei = proposalsList.length ? proposalsList[0].price.dp(2).toString() : '0';
      return toNumber(window.web3.utils.fromWei(listingPriceWei, 'ether'));
    }

    return 0;
  }, [window.web3.utils, proposalsList]);

  if (crowdLoading) {
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
          {crowd?.status === "complete" && (
            <>
              {!!crowd?.myFound &&
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
                isParticipants={!!crowd?.myFound}
                makeVote={makeVote}
              />
            </>
          )}
        </NftBlock>
        <Columns>
          <CrowdBlock
            type={crowd?.status || "failed"}
            collected={crowd?.collected}
            percentage={crowd?.percentage}
            price={crowd?.price}
            priceWei={crowd?.priceWei}
            collectedWei={crowd?.collectedWei}
            participant={crowd?.deposits}
            listingPrice={listingPrice}
            myFound={crowd?.myFound}
            afterFounds={listingPrice * fraction}
            leftovers={crowd?.leftovers}
            onOpenModal={onOpenModal}
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
