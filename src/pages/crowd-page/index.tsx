import React, { FC, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import Loader from "react-loader-spinner";

import Layout from '@app/components/layout';
import UserBadge from "@app/components/user-badge";
import Modal from "@app/components/modal";
import Proposals from "./components/proposals";
import Button from "@app/components/button";
import CrowdBlock from "./components/crowd-block";
import ProposalForm from "./components/proposal-form";
import EthForm from "./components/eth-form";
import MobilePage from './mobile/index';

import chainStore from '@app/stores/chainStore';
import daoStore from "@app/stores/daoStore";

import { IProposalFormData } from './components/proposal-form/constants';
import { StateEnum } from '@enums/state-enum/index';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { media } from "@app/assets/styles/constants";

import rarible from '@assets/images/rarible.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  
  ${media('large')} {
    margin-top: 64px;
    width: 1220px;
  }
`;

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
  width: 800px;
  margin-right: 40px;
`

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
  height: 250px;
  width: 186px;
  margin-bottom: 18px;
  border-radius: 10px;
  margin: auto;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const badge = css`
  margin-bottom: 12px;
`;

const badgeText = css`
  color: #fff;
  font-weight: 700;
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
  ${media('mobile')} {
    display: none;
  }
`;
//#endregion

export interface IEthFormData {
  deposite: string;
}

export enum ModalModeEnum {
  Proposal = 'proposal',
  Eth = 'eth',
}

const CrowdPage: FC = observer(() => {
  const { pathname } = useLocation();

  const { 
    address,
    balance,
    loadWeb3,
    loadBlockChain,
    blockChainState,
  } = chainStore;

  const {
    getDao,
    getProposals,
    donate,
    createProposal,
    voteFor,
    adaptedDao,
    daoState,
    donateState,
    originalDao,
    proposalsList,
    createProposalState,
  } = daoStore;

  const [isOpen, setIsOpen] = useState(false);
  const [proposalFormData, setProposalFormData] = useState<IProposalFormData | null>(null);
  const [ethFormData, setEthFormData] = useState<IEthFormData | null>(null);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [ceramicStream, setCeramicStream] = useState('');

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
  }, []);

  useEffect(() => {
    const id = pathname.split('/')[1];
    setCeramicStream(id);
    getDao(id);
  }, [pathname]);

  useEffect(() => {
    if (adaptedDao) {
      getProposals(ceramicStream);
    }
  }, [adaptedDao]);

  const onCloseModal = () => setIsOpen(false);

  const onOpenModal = (mode: ModalModeEnum) => {
    setIsOpen(true);
    setModalMode(mode);
  };

  const onProposalSubmit = async (data: IProposalFormData) => {
    try {
      const { header, description } = data;

      setProposalFormData(data);
      await createProposal(adaptedDao.ceramic_stream, header, description)
      onCloseModal();
    } catch (error) {}
  };

  const onEthSubmit = async (data: IEthFormData) => {
    try {
      setEthFormData(data);
      await donate(address, adaptedDao.ceramic_stream, data.deposite, originalDao.l1_vault);
      onCloseModal();
    } catch (error) {}
  };

  return (
    <Layout balance={balance} blockChainState={blockChainState}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        isLight
        title={modalMode === ModalModeEnum.Proposal ? "New Proposal" : "Add BNB"}
      >
        {modalMode === ModalModeEnum.Proposal ? (
          <ProposalForm 
            onSubmit={onProposalSubmit} 
            loading={createProposalState === StateEnum.Loading} 
          />
        ) : (
          <EthForm 
            onSubmit={onEthSubmit} 
            loading={donateState === StateEnum.Loading} 
          />
        )}
      </Modal>
      {daoState !== StateEnum.Loading ? <Root>
        {/* ортобразится только при ширине экрана меньше 420px */}
        <MobilePage />
        {/* ортобразится только при ширине экрана больше 420px */}
        {daoState === StateEnum.Success && <MainBlock>
          <NftBlock>
            <UserRow>
              <UserName>{adaptedDao?.partyName}</UserName>
              <img src={rarible} alt="rarible" />
            </UserRow>
            <UserBadge name="user" className={badge} textClassName={badgeText}/>
            <Preview src={adaptedDao?.image} alt="preview" />
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
            tokenName="$Holder" 
            collected={adaptedDao?.percentage}
            participants={adaptedDao?.users}
            myPaid={adaptedDao?.myPaid}
            onAddClick={() => onOpenModal(ModalModeEnum.Eth)}
          />
        </MainBlock>}
        <Proposals onVoteFor={voteFor} proposals={proposalsList} className={proposalVisible} />
      </Root> : <Loading>
          <Loader
            type="Puff"
            color="#6200E8"
            height={100}
            width={100}
            timeout={3000}
          />
        </Loading>}
    </Layout>
  );
});

export default CrowdPage;
