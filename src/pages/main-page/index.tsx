import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Layout from "@app/components/layout";
import Parties from "./components/parties";
import MobileTopline from "./components/mobile-topline/index";

import chainStore from "@stores/chainStore";
import daoStore from "@app/stores/daoStore";

import { TabsEnum } from "@enums/tabs";
import { StateEnum } from "@enums/state-enum";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "../../assets/styles/atomic";
import { notify } from "../../utils/notify";

import plus from "@app/assets/images/plus.svg";

const AddButton = styled.button`
  width: 36px;
  height: 36px;
  margin-left: 18px;
  background: #6200e8;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 0.8px 1.5px rgba(0, 240, 255, 0.12),
    0px 6px 12px rgba(0, 240, 255, 0.18);
`;

const ButtonText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #6c5ce7;
  letter-spacing: 0.44px;
  color: #ffffff;
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 1152px;
  padding-top: 28px;
  padding-bottom: 28px;
  margin: auto;
`;

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  position: absolute;
  right: 0;
`;

const modalLarge = css`
  padding: 0;
  overflow: hidden;
  width: 404px;
`;

const tabs = css`
  ${media("mobile")} {
    display: none;
  }
`;
//#endregion

const MainPage: FC = observer(() => {
  const { loadWeb3, loadBlockChain, balance, blockChainState, address } =
    chainStore;

  const {
    getCrowdList,
    loadMoreCrowds,
    getDelta,
    clearPreview,
    crowds,
    totalCrowds,
    crowdState,
    loadedCrowds,
  } = daoStore;

  const [activeTab, setActiveTab] = useState(TabsEnum.All);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
    getDelta();
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success)
      getCrowdList(activeTab === TabsEnum.My ? address : "");
  }, [blockChainState, activeTab]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    clearPreview();
    setIsOpen(false);
  };

  const onTabChange = (active: TabsEnum) => {
    if (crowdState !== StateEnum.Loading) {
      setActiveTab(active);
    }
  };

  return (
    <Layout
      onSubmit={() => getCrowdList(activeTab === TabsEnum.My ? address : "")}
      openModal={openModal}
      closeModal={closeModal}
      isModalOpen={modalIsOpen}
    >
      <MobileTopline
        activeTab={activeTab}
        onChange={onTabChange}
        onAdd={openModal}
      />
      <Parties
        loading={crowdState === StateEnum.Loading}
        crowds={crowds}
        onCreateClick={openModal}
        loadMore={loadMoreCrowds}
        hasMore={loadedCrowds < totalCrowds}
      />
    </Layout>
  );
});

export default MainPage;
