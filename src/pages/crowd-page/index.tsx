import React, { FC, useEffect, useState } from "react";
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import Loader from 'react-loader-spinner';
import { useLocation } from "react-router-dom";

import CrowdBlock from "@app/components/crowd-block";
import Layout from '@app/components/layout';
import Button from '@app/components/button';
import Proposal from '@app/components/proposal';
import Input from '@app/components/input';
import TextArea from '@app/components/text-area';

import chainStore from '@app/stores/chainStore';

//import rarible from "src/assets/images/rarible.svg";
import close from '@assets/images/close.svg';

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
  } = chainStore;

  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [poolId, setPoolId] = useState(0);
  const [myCrowd, setMyCrowd] = useState(0);
  const [userData, setUserData] = useState<any[]>([]);
  const [addLoading, setAddLoading] = useState(false);

  const [addModalVisible, setAddModalVisible] = useState(false);

  const location = useLocation();

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
    setAddLoading(true);
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

  console.log(daoContract, 'dao')

  return (
    <Layout>
      {/* <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <div className={s.modalHeader}>
          <p className={s.modalTitle}>Add proposal</p>
          <button className={s.closeButton}>
            <img src={close} alt="close" onClick={() => setIsOpen(false)}/>
          </button>
        </div>
        <Input 
          label="Header" 
          placeholder="header" 
          value={header} 
          onChange={(e) => setHeader(e.target.value)}
          className={s.mb12}
        />
        <TextArea
          label="Description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={s.mb18}
        />
        <Button loading={addLoading} onClick={createNewProposal} className={s.button}>Add Proposal</Button>
      </Modal>
      {pool ? <>
        <div className={s.root}>
          <div className={s.nftBlock}>
            <div className={s.titleBlock}>
              <p className={s.title}>{pool.name}</p>
              <a className={s.rari} href={`https://rarible.com/token/${pool.nft_address}:${pool.nft_id}?tab=bids`}>
                <img src={rarible} alt="rarible" />
              </a>
            </div>
            <div className={s.user}>
              <div className={s.avatar}></div>
              <div className={s.name}>name</div>
            </div>
            <div className={s.imageContainer}>
              <img className={s.img} alt="nft" src={pool.image} />
            </div>
            {daoContract && <Button onClick={() => setIsOpen(true)}>Add Proposal</Button>}
          </div>
          <CrowdBlock 
            price={pool.price}
            percentage={pool.percentage}
            participants={pool.participants.length}
            title={pool.party_name}
            description={pool.description}
            onDeposite={handleDeposite}
            myCrowd={myCrowd}
            userData={userData}
            loading={depositeLoading}
            modalVisible={addModalVisible}
            onModalOpen={() => setAddModalVisible(true)}
            onModalClose={() => setAddModalVisible(false)}
          />
        </div>
        <div className={s.proposalBlock}>
          {proposals.map((item: any) => <Proposal 
            title={item.title}
            description={item.description}
            voteAgree={+item.votes_for}
            voteDisagree={+item.votes_against}
            id={item.id}
            onVote={vote}
            status={item.status}
            />)}
        </div>
      </>: <div className={s.loaderContainer}>
        <Loader
          type="Puff"
          color="#6200E8"
          height={100}
          width={100}
          timeout={3000}
        />
      </div> } */}
    </Layout>
  );
});

export default CrowdPage;
