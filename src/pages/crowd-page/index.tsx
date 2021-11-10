import React, { FC, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import Layout from '@app/components/layout';
import Modal from "@app/components/modal";
import EthForm from "./components/eth-form";
import ProposalForm from "./components/proposal-form";
import WithdrawForm from "./components/withdraw-form";
import MobilePage from './mobile/index';
import DesktopPage from "./desktop";

import chainStore from '@app/stores/chainStore';
import daoStore from "@app/stores/daoStore";

import { IProposalFormData } from './components/proposal-form/constants';
import { StateEnum } from '@enums/state-enum/index';

//#region styles
import { styled } from '@linaria/react';
import { media } from "@app/assets/styles/constants";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  
  ${media('large')} {
    margin-top: 64px;
    width: 1220px;
  }
`;
//#endregion

export interface IEthFormData {
  deposite: string;
}

export enum ModalModeEnum {
  Proposal = 'proposal',
  Eth = 'eth',
  Withdraw = 'withdraw',
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
    proposalState,
  } = daoStore;

  const [isOpen, setIsOpen] = useState(false);
  const [proposalFormData, setProposalFormData] = useState<IProposalFormData | null>(null);
  const [ethFormData, setEthFormData] = useState<IEthFormData | null>(null);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<null | JSX.Element>(null);
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

    let title = ''
    let modalContent = null;
    switch (mode) {
      case ModalModeEnum.Eth:
        title = 'Add ETH';
        modalContent = (
          <EthForm 
            onSubmit={onEthSubmit} 
            loading={donateState === StateEnum.Loading} 
          />
        );
        break;
      
      case ModalModeEnum.Proposal:
        title = 'New Proposal';
        modalContent = (
          <ProposalForm 
            onSubmit={onProposalSubmit} 
            loading={createProposalState === StateEnum.Loading} 
          />
        );
        break;
      
      case ModalModeEnum.Withdraw:
        title = 'Withdraw Funds';
        modalContent = (
          <WithdrawForm 
            onSubmit={() => {}}
            loading={false}
            onAmountButtonClick={(setValue) => {
              setValue(adaptedDao?.myPaid?.total_deposit.toString() || '');
            }}
          />
        )
    }

    setModalContent(modalContent);
    setModalTitle(title);
  };

  const onProposalSubmit = async (data: IProposalFormData) => {
    try {
      const { header, description } = data;

      setProposalFormData(data);
      await createProposal(adaptedDao.ceramic_stream, header, description)
      onCloseModal();
      setProposalFormData(null);
    } catch (error) {}
  };

  const onEthSubmit = async (data: IEthFormData) => {
    try {
      setEthFormData(data);
      await donate(address, adaptedDao.ceramic_stream, data.deposite, originalDao.l1_vault);
      onCloseModal();
      setEthFormData(null);
    } catch (error) {}
  };

  return (
    <Layout balance={balance} blockChainState={blockChainState}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        isLight
        title={modalTitle}
      >
        {modalContent}
      </Modal>
      <Root>
        {/* ортобразится только при ширине экрана меньше 420px */}
        <MobilePage />
        {/* ортобразится только при ширине экрана больше 420px */}
        <DesktopPage 
          adaptedDao={adaptedDao}
          proposalsList={proposalsList}
          onOpenModal={onOpenModal}
          onVoteFor={voteFor}
          proposalsLoading={proposalState === StateEnum.Loading}
          daoLoading={daoState === StateEnum.Loading}
          nftId={originalDao?.l1_vault}
        />
      </Root>
    </Layout>
  );
});

export default CrowdPage;
