import React, { useState, useRef, useEffect, useMemo } from "react";
import { toNumber } from "lodash";

import TabButton from "@app/mobile-components/tab-button";
import Tabs from "@app/mobile-components/tabs";
import CrowdTab from "./components/corwd-tab/index";
import ProposalTab from "./components/proposal-tab/index";
import Skeleton from "./components/skeleton";

import { CrowdPageProps } from "../desktop";
import { CrowdPageEnum } from "../../../enums/crowd-page-enum/index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { media } from "@app/assets/styles/atomic";
import { textPrimary } from "@app/assets/styles/constants";

import noMedia from '@assets/images/no_image.png';

const Root = styled.div`
  ${media("large")} {
    display: none;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  width: 80%;
  margin: 44px 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: ${textPrimary};
  text-align: center;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 375px;
  width: 100%;
  margin-bottom: 44px;
  background: #141414;
  border-radius: 30px;
`;

const Main = styled.div`
  padding-left: 36px;
  padding-right: 36px;

  ${media("mobile")} {
    padding-bottom: 26px;
  }
`;

const tabsWrapper = css`
  padding-left: 39px;
  padding-right: 39px;
`;

const shadows = {
  active: css`
    box-shadow: 280px 0px 80px 40px #00f0ff, -120px 0px 80px 40px #01b2ea;
  `,
  failed: css`
    box-shadow: 280px 0px 80px 40px #ff1cf7, -120px 0px 80px 40px #a812dd;
  `,
  sailed: css`
    box-shadow: 280px 0px 80px 40px #02ffa4, -120px 0px 80px 40px #ff8a00;
  `,
  success: css`
    box-shadow: 280px 0px 80px 40px #c8ff2a, -120px 0px 80px 40px #22b928;
  `,
  on_execution: css`
    box-shadow: 280px 0px 80px 40px #00f0ff, -120px 0px 80px 40px #01b2ea;
  `,
};

//#endregion

const MobilePage = ({
  crowd,
  crowdLoading,
  proposalsList,
  proposalsLoading,
  nftId,
  makeVote,
  onOpenModal,
}: CrowdPageProps) => {
  const [activeTab, setActiveTab] = useState(CrowdPageEnum.info);
  const imgEl = useRef<HTMLImageElement>(null);

  const [loaded, setLoaded] = useState(false);

  const onImageLoaded = () => setLoaded(true);

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, []);

  const fraction = (crowd?.myFound || 0) / toNumber(crowd?.price);

  const listingPrice = useMemo(() => {
    if (window.web3.utils) {
      const listingPriceWei = proposalsList.length ? proposalsList[0].price.dp(2).toString() : '0';
      return toNumber(window.web3.utils.fromWei(listingPriceWei, 'ether'));
    }

    return 0;
  }, [window.web3.utils, proposalsList]);

  if (crowdLoading) {
    return <Skeleton />;
  }

  return (
    <Root>
      <InfoBlock>
        <Title>PartyName</Title>
      </InfoBlock>
      <PreviewContainer className={shadows[crowd.status] || shadows.active}>
        <img ref={imgEl} src={crowd.media || noMedia} alt="media" />
        {/* {!loaded && <Loader width={50} height={25} type="Puff" color="#6200E8" />} */}
      </PreviewContainer>
      <Main>
        <Tabs wrapperClassName={tabsWrapper}>
          <TabButton
            onClick={() => setActiveTab(CrowdPageEnum.info)}
            active={activeTab === CrowdPageEnum.info}
          >
            Info
          </TabButton>
          <TabButton
            onClick={() => setActiveTab(CrowdPageEnum.voting)}
            active={activeTab === CrowdPageEnum.voting}
            disabled={
              crowd.status === "active" ||
              crowd.status === "failed" ||
              crowd.status === "on_execution"
            }
          >
            Voting
          </TabButton>
        </Tabs>
        {activeTab === CrowdPageEnum.info ? (
          <CrowdTab
            status={crowd.status || "active"}
            participants={crowd.deposits}
            collected={crowd?.collected}
            percentage={crowd?.percentage}
            price={crowd?.price}
            priceWei={crowd?.priceWei}
            collectedWei={crowd?.collectedWei}
            listingPrice={listingPrice}
            myFound={crowd?.myFound}
            afterFounds={listingPrice * fraction}
            leftovers={crowd?.leftovers}
            onOpenModal={onOpenModal}
            votingType={
              proposalsList.length ? proposalsList[0].type : "notVoting"
            }
            proposalsLoading={proposalsLoading}
          />
        ) : (
          <ProposalTab />
        )}
      </Main>
    </Root>
  );
};

export default MobilePage;
