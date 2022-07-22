import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useHistory } from "react-router-dom";

import Layout from "@app/components/layout";
import CrowdList from "./components/crowd-list";
import Tabs from "@app/mobile-components/tabs";
import TabButton from "@app/mobile-components/tab-button";

import chainStore from "@stores/chainStore";
import crowdStore from "@stores/crowdStore";

import { StateEnum } from "@enums/state-enum";
import { RouteNames } from "@app/router/route-names";
import { useLayoutHeightAuto } from '@app/hooks/layout-hooks';

//#region styles
import { css, cx } from "@linaria/core";

import { h100, mobileComponent } from "@assets/styles/atomic";

const tabs = css`
  padding: 0 36px;
  margin-bottom: 24px;
  margin-top: 18px;
`;
//#endregion

const MainPage: FC = observer(() => {
  const location = useLocation();
  const { push } = useHistory();

  const { loadWeb3, loadBlockChain, blockChainState, address } = chainStore;

  const {
    getCrowdList,
    loadMoreCrowds,
    clearPreview,
    getCrowdTotal,
    crowds,
    totalCrowds,
    crowdState,
    loadedCrowds,
  } = crowdStore;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const isMyCrowdsPage = location.pathname === "/my-crowds";

  useEffect(() => {
    if (blockChainState !== StateEnum.Success) {
      loadWeb3();
      loadBlockChain();
    }
  }, []);

  useEffect(() => {
    if (blockChainState === StateEnum.Success) {
      getCrowdList(isMyCrowdsPage ? address : "");
      getCrowdTotal();
    }
  }, [blockChainState]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    clearPreview();
    setIsOpen(false);
  };

  const onTabClick = (path: string) => {
    if (crowdState !== StateEnum.Loading) {
      push(path);
    }
  };

  useLayoutHeightAuto(crowds.length, crowdState === StateEnum.Success, blockChainState === StateEnum.Success);

  return (
    <Layout
      openModal={openModal}
      closeModal={closeModal}
      isModalOpen={modalIsOpen}
    >
      <div className={h100}>
        <Tabs className={cx(mobileComponent, tabs)}>
          <TabButton
            active={!isMyCrowdsPage}
            onClick={() => onTabClick(RouteNames.INDEX)}
          >
            All crowds
          </TabButton>
          <TabButton
            active={isMyCrowdsPage}
            onClick={() => onTabClick(RouteNames.MY_CROWDS)}
          >
            My crowds
          </TabButton>
        </Tabs>
        <CrowdList
          isMyCrowds={isMyCrowdsPage}
          loading={crowdState === StateEnum.Loading}
          crowds={crowds}
          onCreateClick={openModal}
          loadMore={loadMoreCrowds}
          hasMore={loadedCrowds < totalCrowds}
        />
      </div>
    </Layout>
  );
});

export default MainPage;
