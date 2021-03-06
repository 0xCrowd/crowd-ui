import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { toNumber } from "lodash";
import { useMetaMask } from "metamask-react";

import Layout from "@app/components/layout";
import Modal from "@app/components/modal";
import EthForm from "./components/eth-form";
import ProposalForm from "./components/proposal-form";
import WithdrawForm from "./components/withdraw-form";
import MobilePage from "./mobile/index";
import DesktopPage from "./desktop";
import PriceForm from './components/price-form/index';

import chainStore from "@stores/chainStore";
import crowdStore from "@stores/crowdStore";
import proposalStore from "@stores/proposalStore";
import transactionsStore from "@stores/transactionsStore";

import { StateEnum } from "@enums/state-enum/index";
import { ModalModeEnum } from "@app/enums/modal-enum";
import { ProposalChoice } from "@app/enums/proposal-choice-enum";
import { IEthFormData } from "./components/eth-form/constants";
import { IProposalFormData } from "./components/proposal-form/constants";
import { useAddLayoutHeightAuto } from "@app/hooks/layout-hooks";
import { RINKEBY_ID } from "@app/constants/chain";

//#region styles
import { styled } from "@linaria/react";
import { media } from "@app/assets/styles/atomic";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 100%;

  ${media("large")} {
    margin-top: 64px;
    width: 1150px;
  }
`;
//#endregion


const CrowdPage: FC = observer(() => {
  const { pathname } = useLocation();
  const { chainId } = useMetaMask();

  const { balance, loadWeb3, loadBlockChain, blockChainState } = chainStore;

  useAddLayoutHeightAuto(blockChainState === StateEnum.Error || chainId !== RINKEBY_ID);

  const {
    getCrowd,
    resetLoadingStatus,
    detailedCrowd,
    detailedCrowdState,
  } = crowdStore;

  const {
    createProposal,
    makeVote,
    getProposals,
    proposalsList,
    createProposalState,
    proposalState,
    voteState,
  } = proposalStore;

  const {
    donate,
    withdraw,
    donateState,
  } = transactionsStore;

  const [isOpen, setIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [modalTitle, setModalTitle] = useState("");
  const [ceramicStream, setCeramicStream] = useState("");

  useEffect(() => {
    if (blockChainState !== StateEnum.Success) {
      loadWeb3();
      loadBlockChain();
    }

    return () => {
      resetLoadingStatus();
    }
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success) {
      const id = pathname.split("/")[1];
      setCeramicStream(id);
      getCrowd(id);
    }
  }, [pathname, blockChainState]);

  useEffect(() => {
    if (detailedCrowd && (detailedCrowd.status === "success" || detailedCrowd.status === 'resolved')) {
      getProposals(ceramicStream);
    }
  }, [ceramicStream, detailedCrowd]);

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
      await createProposal(ceramicStream, price);
      onCloseModal();
      getProposals(ceramicStream);
    } catch (error) { }
  };

  const onEthSubmit = async ({ deposite }: IEthFormData) => {
    try {
      await donate(deposite, detailedCrowd.fundraising);
      onCloseModal();
      getCrowd(ceramicStream);
    } catch (error) { }
  };

  const onWithdrawSubmit = async ({ deposite }: IEthFormData) => {
    try {
      await withdraw(detailedCrowd.id, deposite);
      onCloseModal();
      getCrowd(ceramicStream);
    } catch (error) { }
  };

  const onWithdrawWithoutAmount = async () => {
    try {
      await withdraw(detailedCrowd.id);
      getCrowd(ceramicStream);
    } catch (error) { }
  }

  const onPriceSubmit = async ({ price }: IProposalFormData) => {
    try {
      await makeVote(proposalsList[0].id, ProposalChoice.Own, price);
      onCloseModal();
      getProposals(ceramicStream);
    } catch (error) { }
  };

  const renderModalContent = () => {
    switch (modalMode) {
      case ModalModeEnum.Eth:
        const maxWei = detailedCrowd?.priceWei.minus(detailedCrowd.collectedWei).toString();
        const max = toNumber(window.web3.utils.fromWei(maxWei, 'ether'));
        return (
          <EthForm
            onSubmit={onEthSubmit}
            loading={donateState === StateEnum.Loading}
            max={max}
            userBalance={toNumber(balance)}
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
        const myFound = detailedCrowd.myFoundEth as number;
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
            proposalPrice={proposalsList && proposalsList[0]?.priceEth}
          />
        );
    }
  };

  const onMakeVote = async (
    proposalId: number,
    choice: ProposalChoice,
    amount: string
  ) => {
    await makeVote(proposalId, choice, amount);
    getProposals(ceramicStream);
  };

  return (
    <Layout
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
        {/* ???????????????????????? ???????????? ?????? ???????????? ???????????? ???????????? 420px */}
        <MobilePage
          crowd={detailedCrowd}
          proposalsList={proposalsList}
          onOpenModal={onOpenModal}
          makeVote={onMakeVote}
          proposalsLoading={proposalState === StateEnum.Loading}
          crowdLoading={detailedCrowdState === StateEnum.Loading}
          nftId={detailedCrowd?.item}
          onWithdrawWithoutAmount={onWithdrawWithoutAmount}
        />
        {/* ???????????????????????? ???????????? ?????? ???????????? ???????????? ???????????? 420px */}
        <DesktopPage
          crowd={detailedCrowd}
          proposalsList={proposalsList}
          onOpenModal={onOpenModal}
          makeVote={onMakeVote}
          proposalsLoading={proposalState === StateEnum.Loading}
          crowdLoading={detailedCrowdState === StateEnum.Loading}
          nftId={detailedCrowd?.item}
          onWithdrawWithoutAmount={onWithdrawWithoutAmount}
        />
      </Root>
    </Layout>
  );
});

export default CrowdPage;
