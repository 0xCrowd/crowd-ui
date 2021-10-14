import React, { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import Layout from "@app/components/layout";
import Button from "@app/components/button/index";
import Modal from '@app/components/modal';
import PartyForm from "./components/party-form";
import NftPreview from "./components/nft-preview";
import Parties from './components/parties';

import raribleStore from "@stores/raribleStore";
import chainStore from "@stores/chainStore";

import { TabsEnum } from "@enums/tabs";
import { StateEnum } from "@enums/state-enum";

import plus from "@app/assets/images/plus.svg";

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { mr24 } from '@assets/styles/constants';

const AddButton = styled.button`
  width: 54px;
  height: 54px;
  margin-left: 18px;
  background: #6200E8;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  background: #FFFFFF;
  box-shadow: 0px 0.8px 1.5px rgba(0, 240, 255, 0.12), 0px 6px 12px rgba(0, 240, 255, 0.18);
`;

const ButtonText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #6C5CE7;
  letter-spacing: 0.44px;
  color: #FFFFFF;
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 1220px;
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

const large = css`
  height: 548px;
`;

const modalLarge = css`
  padding: 0;
  overflow: scroll;
`;
//#endregion

export interface IPartyFormData {
  url: string;
  partyName: string;
  tokenName: string;
}

const MainPage: FC = observer(() => {
  const { order, orderState, getOrder } = raribleStore;
  const { getPartyNumber, clearPool, poolContract, pools, poolLoading } = chainStore;

  const [activeTab, setActiveTab] = useState(TabsEnum.All);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [party, setParty] = useState<IPartyFormData | null>(null);

  useEffect(() => {
    if (poolContract) {
      clearPool();
      getPartyNumber(activeTab);
    }
  }, [poolContract, activeTab, getPartyNumber, clearPool]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const onSubmit = (data: IPartyFormData) => {
    setParty(data);
    const urlSplit = data.url.split("/");
    if (urlSplit[2] !== "rarible.com" && urlSplit[3] !== "token") {
      console.log("err");
    } else {
      const id = urlSplit[4].split("?")[0];
      getOrder(id);
    }
  };

  return (
    <Layout>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        preventScroll={false}
        className={order ? modalLarge : large}
        title={order ? "" : "Start a party"}
      >
        {!order ? (
          <PartyForm
            loading={orderState === StateEnum.Loading}
            onSubmit={onSubmit}
          />
        ) : (
          <NftPreview 
            price={order.bestSellOrder.take.valueDecimal}
            nftName={order.meta.name}
            partyName={party?.partyName || ''}
            userName={order.owners[0]}
            description={order.meta.description}
            image={order.meta.image.url.PREVIEW}
          />
        )}
      </Modal>
      <ButtonsRow>
        <Button
          active={activeTab === TabsEnum.All}
          onClick={() => setActiveTab(TabsEnum.All)}
          containerClassName={mr24}
        >
          ALL PARTIES
        </Button>
        <Button
          active={activeTab === TabsEnum.My}
          onClick={() => setActiveTab(TabsEnum.My)}
        >
          MY PARTIES
        </Button>
        <AddButtonContainer>
          <ButtonText>START A PARTY</ButtonText>
          <AddButton onClick={openModal}>
            <img src={plus} alt="plus" />
          </AddButton>
        </AddButtonContainer>
      </ButtonsRow>
      <Parties loading={false} pools={pools} onCreateClick={openModal} />
    </Layout>
  );
});

export default MainPage;
