import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Layout from "@app/components/layout";
import Modal from "@app/components/modal";
import PartyForm from "./components/party-form";
import NftPreview from "./components/nft-preview";
import Parties from "./components/parties";
import TabButtons from "./components/tab-buttons/index";
import MobileTopline from "./components/mobile-topline/index";

import raribleStore from "@stores/raribleStore";
import chainStore from "@stores/chainStore";
import daoStore from "@app/stores/daoStore";

import { TabsEnum } from "@enums/tabs";
import { StateEnum } from "@enums/state-enum";
import { IPartyFormData } from "./components/party-form/constants";
import { getImageUrl } from "@app/utils/getImageUrl";

import plus from "@app/assets/images/plus.svg";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "@app/assets/styles/constants";
import { notify } from '../../utils/notify';

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
  const { order, orderState, price, getOrder, clearOrder, getPrice } = raribleStore;
  const { loadWeb3, loadBlockChain, balance, blockChainState, address } = chainStore;

  const {
    getDaosList,
    loadMoreDaos,
    createDao,
    getDelta,
    clearPage,
    delta,
    daos,
    totalDaos,
    daoState,
    createDaoState,
  } = daoStore;

  const [activeTab, setActiveTab] = useState(TabsEnum.All);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [party, setParty] = useState<IPartyFormData | null>(null);

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
    getDelta();
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success)
      getDaosList(activeTab === TabsEnum.My ? address : "");
  }, [blockChainState, activeTab]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    clearOrder();
    setIsOpen(false);
    setParty(null);
  };

  const onSubmit = (data: IPartyFormData) => {
    setParty(data);

    let id = "";

    const [, , domain, page, address, nftId] = data.url.split("/");

    if (domain === "rarible.com" || domain === "rinkeby.rarible.com") {
      if (page === "token") {
        console.log(address.split("?")[0], "?");
        id = address.split("?")[0];
      }
    }

    if (domain === "opensea.io") {
      if (page === "assets") {
        id = `${address}:${nftId}`;
      }
    }
    const [nftAddress, newNftId] = id.split(":");

    getOrder(id);
    getPrice(nftAddress, newNftId);
  };

  const onCreate = async () => {
    try {
      await createDao(party as IPartyFormData);
      closeModal();
      clearPage();
      getDaosList(activeTab === TabsEnum.My ? address : "");
    } catch (error) {}
  };

  const onTabChange = (active: TabsEnum) => {
    if (daoState !== StateEnum.Loading) {
      setActiveTab(active);
    }
  };

  return (
    <Layout balance={balance} blockChainState={blockChainState}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        preventScroll={false}
        className={order ? modalLarge : ""}
        title={order ? "" : "Start a PARTY"}
        isLight={!order ? true : false}
        onBack={order ? clearOrder : undefined}
      >
        {!order ? (
          <PartyForm
            loading={orderState === StateEnum.Loading}
            onSubmit={onSubmit}
          />
        ) : (
          <NftPreview
            loading={createDaoState === StateEnum.Loading}
            price={price || 0 + delta}
            nftName={order.meta.name}
            partyName="Crowd party"
            userName={order.owners[0]}
            description={order.meta.description}
            image={getImageUrl(
              order.meta.image ?
                order.meta.image.url.ORIGINAL || order.meta.image.url.PREVIEW :
                order.meta.animation.url.ORIGINAL
            )}
            nftId={order.id}
            onSubmit={onCreate}
          />
        )}
      </Modal>
      <MobileTopline
        activeTab={activeTab}
        onChange={onTabChange}
        onAdd={openModal}
      />
      <ButtonsRow className={tabs}>
        <TabButtons activeTab={activeTab} onChange={onTabChange} />
        <AddButtonContainer>
          <ButtonText>START A PARTY</ButtonText>
          <AddButton onClick={openModal}>
            <img src={plus} alt="plus" />
          </AddButton>
        </AddButtonContainer>
      </ButtonsRow>
      <Parties
        loading={daoState === StateEnum.Loading}
        daos={daos}
        onCreateClick={openModal}
        loadMore={loadMoreDaos}
        hasMore={daos.length < totalDaos}
      />
    </Layout>
  );
});

export default MainPage;
