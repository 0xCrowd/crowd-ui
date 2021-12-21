import React, { ReactElement } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

import RaribleButton from "@app/components/rarible-button";
import Voting from "@app/components/voting";
import GradientBorderButton from "@app/components/gradient-border-button";
import CrowdBlock from "./components/crowd-block";

import { ModalModeEnum } from "../index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { mb36, media } from "@app/assets/styles/atomic";
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
  adaptedCrowd: AdaptedCrowd;
  daoLoading: boolean;
  proposalsList: IAdaptedProposal[];
  proposalsLoading: boolean;
  nftId: string;
  isSold: boolean;
  makeVote: (proposalStream: string, option: number, amount: string) => void;
  onOpenModal: (mode: ModalModeEnum) => void;
}

const DesktopPage = ({
  adaptedCrowd,
  daoLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  isSold,
  makeVote,
  onOpenModal,
}: Props): ReactElement => {
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
            <RaribleButton tokenId={nftId}/>
          </UserRow>
          <PreviewContainer>
            <Preview 
              src={adaptedCrowd.media} 
              alt="preview"
            />
          </PreviewContainer>
          <GradientBorderButton className={proposalButton}>Put the NFT on sale</GradientBorderButton>
          <Voting />
        </NftBlock>
        <CrowdBlock
          type={adaptedCrowd?.status}
          collected={adaptedCrowd?.collected}
          percentage={adaptedCrowd?.percentage}
          price={adaptedCrowd?.price}
          participant={adaptedCrowd?.deposits}
          listingPrice={1000}
          yourPercent={100}
          yourFound={100}
          afterFounds={100}
          leftovers={100}
        />
      </MainBlock>
    </>
  );
};

export default DesktopPage;
