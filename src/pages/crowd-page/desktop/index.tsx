import React, { ReactElement } from "react";
import SkeletonLoader from "tiny-skeleton-loader-react";

import UserBadge from "@app/components/user-badge";
import Button from "@app/components/button";
import CrowdBlock from "./components/crowd-block";
import Proposals from "./components/proposals/index";

import { ModalModeEnum } from "../index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "@app/assets/styles/constants";

import rarible from "@assets/images/rarible.svg";
import RaribleButton from "@app/components/rarible-button";

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
  width: 800px;
  margin-right: 40px;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const UserName = styled.div`
  font-family: Inter;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #fff;
`;


const Preview = styled.img`
  height: 440px;
  width: auto;
  margin-bottom: 18px;
  border-radius: 10px;
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

const button = css`
  width: calc(100% - 2px);
  height: 46px;
`;

const buttonContainer = css`
  width: 100%;
  height: 48px;
`;

const proposalVisible = css`
  ${media("mobile")} {
    display: none;
  }
`;
//#endregion

interface Props {
  adaptedDao: IAdaptedDao;
  daoLoading: boolean;
  proposalsList: IAdaptedProposal[];
  proposalsLoading: boolean;
  nftId: string
  onVoteFor: (ceramicStream: string) => void;
  onOpenModal: (mode: ModalModeEnum) => void;
}

const DesktopPage = ({
  adaptedDao,
  daoLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  onVoteFor,
  onOpenModal,
}: Props): ReactElement => {
  if (daoLoading) {
    return (
      <MainBlock>
        <SkeletonLoader
          width={800}
          height={566}
          background="linear-gradient(0deg,#263238,#263238)"
          style={{ marginRight: 40 }}
        />
        <SkeletonLoader
          height={566}
          width={380}
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
            <UserName>{adaptedDao?.partyName}</UserName>
            <RaribleButton tokenId={nftId}/>
          </UserRow>
          <Preview 
            height={adaptedDao?.imageMeta.height} 
            width={adaptedDao?.imageMeta.width} 
            src={adaptedDao?.image} 
            alt="preview"
          />
          <Button
            onClick={() => onOpenModal(ModalModeEnum.Proposal)}
            className={button}
            containerClassName={buttonContainer}
            active
          >
            New proposal
          </Button>
        </NftBlock>
        <CrowdBlock
          partyName={adaptedDao?.partyName}
          description={adaptedDao?.description}
          price={adaptedDao?.price}
          tokenName={adaptedDao?.tokenTicker}
          collected={adaptedDao?.percentage}
          participants={adaptedDao?.users}
          myPaid={adaptedDao?.myPaid}
          onAddClick={() => onOpenModal(ModalModeEnum.Eth)}
          onWithdrawClick={() => onOpenModal(ModalModeEnum.Withdraw)}
        />
      </MainBlock>
      <Proposals
        onVoteFor={onVoteFor}
        proposals={proposalsList}
        className={proposalVisible}
        loading={proposalsLoading}
      />
    </>
  );
};

export default DesktopPage;
