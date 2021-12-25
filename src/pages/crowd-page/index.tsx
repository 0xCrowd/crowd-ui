import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import Layout from "@app/components/layout";
import Modal from "@app/components/modal";
import EthForm from "./components/eth-form";
import ProposalForm from "./components/proposal-form";
import WithdrawForm from "./components/withdraw-form";
import MobilePage from "./mobile/index";
import DesktopPage from "./desktop";

import chainStore from "@app/stores/chainStore";
import daoStore from "@app/stores/daoStore";

import { StateEnum } from "@enums/state-enum/index";
import { IEthFormData } from "./components/eth-form/constants";
import { IProposalFormData } from "./components/proposal-form/constants";

//#region styles
import { styled } from "@linaria/react";
import { media } from "@app/assets/styles/atomic";
import PriceForm from './components/price-form/index';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  ${media("large")} {
    margin-top: 64px;
    width: 1150px;
  }
`;
//#endregion

export enum ModalModeEnum {
  Proposal = "proposal",
  Eth = "eth",
  Withdraw = "withdraw",
  Price = "price",
}

const CrowdPage: FC = observer(() => {
  const { pathname } = useLocation();

  const { address, loadWeb3, loadBlockChain, blockChainState } = chainStore;

  const {
    getCrowd,
    getProposals,
    donate,
    createProposal,
    makeVote,
    getDelta,
    withdraw,
    detailedCrowd,
    crowdState,
    donateState,
    proposalsList,
    createProposalState,
    proposalState,
    voteState,
  } = daoStore;

  const [isOpen, setIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [modalTitle, setModalTitle] = useState("");
  const [ceramicStream, setCeramicStream] = useState("");
  const [proposalStream, setProposalStream] = useState("");
  const [isUserNotified, setIsUserNotified] = useState(false);

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
    getDelta();
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success) {
      const id = pathname.split("/")[1];
      setCeramicStream(id);
      getCrowd(id);
    }
  }, [pathname, blockChainState]);

  useEffect(() => {
    if (detailedCrowd && detailedCrowd.status === "complete") {
      getProposals(ceramicStream);
    }
  }, [ceramicStream, detailedCrowd]);

  // useEffect(() => {
  //   if (adaptedDao) {
  //     getProposals(ceramicStream);
  //   }
  // }, [adaptedDao]);

  // useEffect(() => {
  //   let id: NodeJS.Timer | null = null;
  //   if (
  //     !isUserNotified &&
  //     adaptedDao &&
  //     proposalsList.length &&
  //     !adaptedDao.isBought &&
  //     adaptedDao.collected >= adaptedDao.price
  //   ) {
  //     notifySuccess("Buyout in process. It's take about 30 seconds");
  //     id = setInterval(() => getCrowdList(undefined, ceramicStream), 30000);
  //     setIsUserNotified(true);
  //   }

  //   if (
  //     adaptedDao &&
  //     proposalsList.length &&
  //     adaptedDao.isBought &&
  //     id
  //   ) {
  //     clearInterval(id);
  //   }
  // }, [proposalsList, adaptedDao]);

  const onCloseModal = () => setIsOpen(false);

  const onOpenModal = (mode: ModalModeEnum) => {
    setIsOpen(true);
    setModalMode(mode);

    let title = "";

    switch (mode) {
      case ModalModeEnum.Eth:
        title = "Add ETH";
        break;

      case ModalModeEnum.Proposal:
        title = "New Proposal";
        break;

      case ModalModeEnum.Withdraw:
        title = "Withdraw Funds";
        break;
      
      case ModalModeEnum.Price:
        title = "Put NFT on selling";
    }

    setModalTitle(title);
  };

  const onProposalSubmit = async ({ price }: IProposalFormData) => {
    try {
      await createProposal(detailedCrowd.ceramic_stream, price);
      onCloseModal();
      getProposals(ceramicStream);
    } catch (error) {}
  };

  const onEthSubmit = async (data: IEthFormData) => {
    try {
      await donate(
        address,
        detailedCrowd.ceramic_stream,
        data.deposite,
        detailedCrowd.l1_vault
      );
      onCloseModal();
      getCrowd(ceramicStream);
    } catch (error) {}
  };

  const onWithdrawSubmit = async ({ deposite }: IEthFormData) => {
    try {
      await withdraw(deposite);
      onCloseModal();
      getCrowd(ceramicStream);
    } catch (error) {}
  };

  const onPriceSubmit = async ({ price }: IProposalFormData) => {
    try {
      await makeVote(proposalStream, 0, price);
      onCloseModal();
      getProposals(ceramicStream);
    } catch (error) {}
  };

  const renderModalContent = () => {
    switch (modalMode) {
      case ModalModeEnum.Eth:
        return (
          <EthForm
            onSubmit={onEthSubmit}
            loading={donateState === StateEnum.Loading}
          />
        );

      case ModalModeEnum.Proposal:
        return (
          <ProposalForm
            onSubmit={onProposalSubmit}
            loading={createProposalState === StateEnum.Loading}
          />
        );

      case ModalModeEnum.Withdraw:
        const myFound = detailedCrowd.myFound as number;
        return (
          <WithdrawForm
            onSubmit={onWithdrawSubmit}
            loading={donateState === StateEnum.Loading}
            onAmountButtonClick={(setValue) => {
              setValue(myFound.toString());
            }}
          />
        );

      case ModalModeEnum.Price:
        return (
          <PriceForm
            onSubmit={onPriceSubmit}
            loading={voteState === StateEnum.Loading}
          />
        );
    }
  };

  const onMakeVote = (
    proposalStream: string,
    option: number,
    amount: string
  ) => {
    if (amount !== 'same' && amount !== 'null') {
      setProposalStream(proposalStream);
      onOpenModal(ModalModeEnum.Price);
    } else {
      makeVote(proposalStream, option, amount);
    }
  };

  return (
    <Layout
      onSubmit={() => getCrowd(ceramicStream)}
      openModal={() => setCreateModalIsOpen(true)}
      closeModal={() => setCreateModalIsOpen(false)}
      isModalOpen={createModalIsOpen}
    >
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        isLight
        title={modalTitle}
      >
        {renderModalContent()}
      </Modal>
      <Root>
        {/* ортобразится только при ширине экрана меньше 420px */}
        <MobilePage />
        {/* ортобразится только при ширине экрана больше 420px */}
        <DesktopPage
          adaptedCrowd={detailedCrowd}
          proposalsList={proposalsList}
          onOpenModal={onOpenModal}
          makeVote={onMakeVote}
          proposalsLoading={proposalState === StateEnum.Loading}
          daoLoading={crowdState === StateEnum.Loading}
          nftId={detailedCrowd?.item}
        />
      </Root>
    </Layout>
  );
});

export default CrowdPage;
