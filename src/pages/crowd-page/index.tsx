import React, { FC, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import { useLocation } from "react-router-dom";

import Layout from '@app/components/layout';
import UserBadge from "@app/components/user-badge";
import Modal from "@app/components/modal";
import Proposals from "./components/proposals";
import Button from "@app/components/button";
import CrowdBlock from "./components/crowd-block";
import ProposalForm from "./components/proposal-form";
import EthForm from "./components/eth-form";

import chainStore from '@app/stores/chainStore';

import { IProposalFormData } from './components/proposal-form/constants';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import rarible from '@assets/images/rarible.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 1220px;
  margin: auto;
  margin-top: 64px;
`;

const MainBlock = styled.div`
  display: flex;
  margin-bottom: 40px;
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
  height: 440px;
  width: 800px;
  margin-bottom: 18px;
  border-radius: 10px;
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
//#endregion

export interface IEthFormData {
  deposite: string;
}

export enum ModalModeEnum {
  Proposal = 'proposal',
  Eth = 'eth',
}

const CrowdPage: FC = observer(() => {
  const { 
    getPool,
    getUserData,
    setDeposite,
    createProposal,
    getAllProposals,
    pool,
    poolContract,
    address,
    depositeLoading,
    daoContract,
    proposals,
    voteFor,
    clearPool,
    balance,
    loadWeb3,
    loadBlockChain,
    blockChainState,
  } = chainStore;

  const [isOpen, setIsOpen] = useState(false);
  const [proposalFormData, setProposalFormData] = useState<IProposalFormData | null>(null);
  const [ethFormData, setEthFormData] = useState<IEthFormData | null>(null);
  const [modalMode, setModalMode] = useState(ModalModeEnum.Proposal);
  const [poolId, setPoolId] = useState(0);
  const [myCrowd, setMyCrowd] = useState(0);
  const [userData, setUserData] = useState<any[]>([]);
  const [addLoading, setAddLoading] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    loadWeb3();
    loadBlockChain();
  }, [])

  useEffect(() => {
    if (poolContract) {
      clearPool();
      const id = +location.pathname.split('/')[2]
      setPoolId(id)
      getPool(id);
      //getDaoContract(id);
    }
  }, [location.pathname, getPool, clearPool, getAllProposals, poolContract]);

  useEffect(() => {
    getAllProposals();
  }, [daoContract, getAllProposals]);

  useEffect(() => {
    const getAllUserData = async () => {
      const promises = pool.participants.map(async (item: string) => {
        let eth = await getUserData(item, poolId);
        console.log(eth, 'eth');
        return {
          eth: +eth,
          user: item,
        }
      });

      const all = await Promise.all(promises);
      console.log(all, 'all')
      setUserData(all);
    };

    if (pool && pool.participants) {
      getAllUserData()
    }

    const getMyCrowd = async () => {
      const myCrowd = await getUserData(address, poolId);
      setMyCrowd(myCrowd);
    }

    getMyCrowd();
  }, [pool, getUserData, poolId, address]);

  const handleDeposite = async (value: string) => {
    const hash = await setDeposite(poolId, value);
    await window.web3.eth.getTransaction(
      hash.transactionHash,
      async (error, trans) => {
        clearPool();
        getPool(poolId);
        setAddModalVisible(false);
      }
    );
  };

  const createNewProposal = async () => {
    if (proposalFormData) {
      setAddLoading(true);
      const { header, description } = proposalFormData;
      const hash = await createProposal(header, description, pool.nft_address, pool.nft_id);
      await window.web3.eth.getTransaction(
        hash.transactionHash,
        async (error, trans) => {
          clearPool();
          getPool(poolId);
          setIsOpen(false);
          setAddLoading(false);
        }
      );
    }
  };

  const vote = async (value: boolean, id: number) => {
    const hash = await voteFor(id, value);
    await window.web3.eth.getTransaction(
      hash.transactionHash,
      async (error, trans) => {
        getAllProposals();
      }
    );
  }

  const onCloseModal = () => setIsOpen(false);

  const onOpenModal = (mode: ModalModeEnum) => {
    setIsOpen(true);
    setModalMode(mode);
  };

  const onProposalSubmit = (data: IProposalFormData) => {
    console.log(data);
    setProposalFormData(data);
  };

  const onEthSubmit = (data: IEthFormData) => {
    console.log(data)
    setEthFormData(data);
  }

  return (
    <Layout balance={balance} blockChainState={blockChainState}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        isLight
        title={modalMode === ModalModeEnum.Proposal ? "New Proposal" : "Add ETH"}
      >
        {modalMode === ModalModeEnum.Proposal ? (
          <ProposalForm onSubmit={onProposalSubmit} loading={false} />
        ) : (
          <EthForm onSubmit={onEthSubmit} loading={false} />
        )}
      </Modal>
      <Root>
        <MainBlock>
          <NftBlock>
            <UserRow>
              <UserName>User party name</UserName>
              <img src={rarible} alt="rarible" />
            </UserRow>
            <UserBadge name="user" className={badge} textClassName={badgeText}/>
            <Preview src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg" alt="" />
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
            partyName="asdasdasd" 
            description="asdasd asdasd asdas asd" 
            price={1000} 
            tokenName="$Holder" 
            collected={80}
            participants={1111}
            yourPaid={0.4}
            onAddClick={() => onOpenModal(ModalModeEnum.Eth)}
          />
        </MainBlock>
        <Proposals proposals={proposals} />
      </Root>
    </Layout>
  );
});

export default CrowdPage;
