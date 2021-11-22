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

import { IProposalFormData } from "./components/proposal-form/constants";
import { StateEnum } from "@enums/state-enum/index";
import { IEthFormData } from "./components/eth-form/constants";

//#region styles
import { styled } from "@linaria/react";
import { media } from "@app/assets/styles/constants";
import { ProposalTypeEnum } from "../../enums/proposalTypeEnum/index";
import { notifySuccess } from "../../utils/notify";
import { ProposalStatusEnum } from "@app/enums/proposal-status-enum";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  ${media("large")} {
    margin-top: 64px;
    width: 1220px;
  }
`;
//#endregion

export enum ModalModeEnum {
  Proposal = "proposal",
  Eth = "eth",
  Withdraw = "withdraw",
}

const CrowdPage: FC = observer(() => {
  const { pathname } = useLocation();

  const { address, balance, loadWeb3, loadBlockChain, blockChainState } =
    chainStore;

  const {
    getDao,
    getProposals,
    donate,
    createProposal,
    makeVote,
    getDelta,
    withdraw,
    updateProposal,
    adaptedDao,
    daoState,
    donateState,
    originalDao,
    proposalsList,
    createProposalState,
    proposalState,
  } = daoStore;

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [modalTitle, setModalTitle] = useState("");
  const [ceramicStream, setCeramicStream] = useState("");
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
      getDao(id);
    }
  }, [pathname, blockChainState]);

  useEffect(() => {
    if (adaptedDao) {
      getProposals(ceramicStream);
    }
  }, [adaptedDao]);

  useEffect(() => {
    let id: NodeJS.Timer | null = null;
    if (
      !isUserNotified &&
      adaptedDao &&
      proposalsList.length &&
      !adaptedDao.isBought &&
      adaptedDao.collected >= adaptedDao.price
    ) {
      notifySuccess("Buyout in process. It's take about 30 seconds");
      id = setInterval(() => getDao(ceramicStream), 30000);
      setIsUserNotified(true);
    }

    if (
      adaptedDao &&
      proposalsList.length &&
      adaptedDao.isBought &&
      id
    ) {
      clearInterval(id);
    }
  }, [proposalsList, adaptedDao]);

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
    }

    setModalTitle(title);
  };

  const onProposalSubmit = async ({ price }: IProposalFormData) => {
    try {
      await createProposal(adaptedDao.ceramic_stream, price);
      onCloseModal();
      getProposals(ceramicStream);
    } catch (error) {}
  };

  const onEthSubmit = async (data: IEthFormData) => {
    try {
      await donate(
        address,
        adaptedDao.ceramic_stream,
        data.deposite,
        originalDao.l1_vault
      );
      onCloseModal();
      getDao(ceramicStream);
    } catch (error) {}
  };

  const onWithdrawSubmit = async ({ deposite }: IEthFormData) => {
    try {
      await withdraw(deposite);
      onCloseModal();
      getDao(ceramicStream);
    } catch (error) {}
  };

  const renderModalContent = (modalMode: ModalModeEnum) => {
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
        return (
          <WithdrawForm
            onSubmit={onWithdrawSubmit}
            loading={donateState === StateEnum.Loading}
            onAmountButtonClick={(setValue) => {
              setValue(adaptedDao?.myPaid?.total_deposit.toString() || "");
            }}
          />
        );
    }
  };

  const checkIsSold = (): boolean => {
    if (proposalsList.length) {
      const sellProposal = proposalsList.find(
        (elem) => elem.type === ProposalTypeEnum.Sell
      );
      if (sellProposal && sellProposal.fulfilled) {
        return true;
      }
      return false;
    }
    return false;
  };

  const onMakeVote = (
    proposalStream: string,
    option: number,
    amount: string
  ) => {
    makeVote(proposalStream, option, amount);
    updateProposal(proposalStream);
  };

  return (
    <Layout balance={balance} blockChainState={blockChainState}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        isLight
        title={modalTitle}
      >
        {renderModalContent(modalMode)}
      </Modal>
      <Root>
        {/* ортобразится только при ширине экрана меньше 420px */}
        <MobilePage />
        {/* ортобразится только при ширине экрана больше 420px */}
        <DesktopPage
          adaptedDao={adaptedDao}
          proposalsList={proposalsList}
          onOpenModal={onOpenModal}
          makeVote={onMakeVote}
          proposalsLoading={proposalState === StateEnum.Loading}
          daoLoading={daoState === StateEnum.Loading}
          nftId={originalDao?.buyout_target}
          isSold={checkIsSold()}
        />
      </Root>
    </Layout>
  );
});

export default CrowdPage;
