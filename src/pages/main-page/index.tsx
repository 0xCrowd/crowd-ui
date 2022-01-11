import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from 'react-router-dom';

import Layout from "@app/components/layout";
import CrowdList from "./components/crowd-list";
import MobileTopline from "./components/mobile-topline/index";

import chainStore from "@stores/chainStore";
import daoStore from "@app/stores/daoStore";

import { TabsEnum } from "@enums/tabs";
import { StateEnum } from "@enums/state-enum";

const MainPage: FC = observer(() => {
  const location = useLocation();

  const { loadWeb3, loadBlockChain, blockChainState, address } =
    chainStore;

  const {
    getCrowdList,
    loadMoreCrowds,
    clearPreview,
    crowds,
    totalCrowds,
    crowdState,
    loadedCrowds,
  } = daoStore;

  const [activeTab, setActiveTab] = useState(TabsEnum.All);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const isMyCrowdsPage = location.pathname === '/my-crowds';

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success)
      getCrowdList(isMyCrowdsPage ? address : "");
  }, [blockChainState]);

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
      <CrowdList
        isMyCrowds={isMyCrowdsPage}
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
