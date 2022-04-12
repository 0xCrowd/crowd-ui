import React, { useState, useRef, useEffect, useMemo } from "react";
import { toNumber } from "lodash";

import TabButton from "@app/mobile-components/tab-button";
import Tabs from "@app/mobile-components/tabs";
import CrowdBlock from "../desktop/components/crowd-block";
import VotingMobile from "@app/mobile-components/voting";
import LiveVoting from "@app/mobile-components/live-voting";
import Skeleton from "./components/skeleton";

import { CrowdPageProps } from "../desktop";
import { CrowdPageEnum } from "../../../enums/crowd-page-enum/index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import { media } from "@app/assets/styles/atomic";
import { textPrimary } from "@app/assets/styles/constants";

import noMedia from "@assets/images/no_image.png";
import { useLayoutDetailsHeightAuto } from "@app/hooks/use-layout-height-auto";

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

type PreviewProps = {
  isLive: boolean;
}

const PreviewContainer = styled.div<PreviewProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 375px;
  width: 100%;
  margin-bottom: ${({ isLive }) => isLive ? '144px' : '44px'};
  background: #141414;
  border-radius: 30px;
`;

const Preview = styled.img`
  max-width: 100%;
  max-height: 375px;
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
  resolved: css`
    box-shadow: 280px 0px 80px 40px #02ffa4, -120px 0px 80px 40px #ff8a00;
  `,
  complete: css`
    box-shadow: 280px 0px 80px 40px #c8ff2a, -120px 0px 80px 40px #22b928;
  `,
  on_execution: css`
    box-shadow: 280px 0px 80px 40px #00f0ff, -120px 0px 80px 40px #01b2ea;
  `,
};

const live = css`
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
`;
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
  useLayoutDetailsHeightAuto();

  useEffect(() => {
    const imgElCurrent = imgEl.current;

    if (imgElCurrent) {
      imgElCurrent.addEventListener("load", onImageLoaded);
      return () => imgElCurrent.removeEventListener("load", onImageLoaded);
    }
  }, []);

  const fraction = (crowd?.myFoundEth || 0) / toNumber(crowd?.priceEth);

  const listingPrice = useMemo(() => {
    if (window.web3.utils) {
      const listingPriceWei = proposalsList.length
        ? proposalsList[0].price.dp(2).toString()
        : "0";
      return toNumber(window.web3.utils.fromWei(listingPriceWei, "ether"));
    }

    return 0;
  }, [window.web3.utils, proposalsList]);

  if (crowdLoading || !crowd) {
    return <Skeleton />;
  }

  const activeProposal = proposalsList[0];

  return (
    <Root>
      <InfoBlock>
        <Title>PartyName</Title>
      </InfoBlock>
      <PreviewContainer isLive={Boolean(activeProposal)} className={shadows[crowd ? crowd.status : "active"]}>
        <Preview ref={imgEl} src={crowd ? crowd.media : noMedia} alt="media" />
        {/* {!loaded && <Loader width={50} height={25} type="Puff" color="#6200E8" />} */}
        {activeProposal && <LiveVoting className={live} />}
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
              crowd ? (
                crowd.status === "active" ||
                crowd.status === "failed" ||
                crowd.status === "on_execution"
              ) : true
            }
          >
            Voting
          </TabButton>
        </Tabs>
        {activeTab === CrowdPageEnum.info ? (
          <CrowdBlock
            type={crowd?.status || "active"}
            participant={crowd?.deposits}
            collected={crowd?.collectedEth}
            percentage={crowd?.percentage}
            price={crowd?.priceEth}
            priceWei={crowd?.priceWei}
            collectedWei={crowd?.collectedWei}
            listingPrice={listingPrice}
            myFound={crowd?.myFoundEth}
            afterFounds={listingPrice * fraction}
            leftovers={crowd?.leftovers}
            onOpenModal={onOpenModal}
            votingType={
              proposalsList.length ? proposalsList[0].type : "notVoting"
            }
            proposalsLoading={proposalsLoading}
          />
        ) : (
          <VotingMobile
            type={activeProposal?.type}
            time={activeProposal?.till}
            voted={activeProposal?.voted}
            against={activeProposal?.against}
            price={activeProposal?.price}
            votingPower={activeProposal?.votingPower}
            isParticipant={Boolean(crowd.myFoundEth)}
            status={crowd.status}
            loading={proposalsLoading}
          />
        )}
      </Main>
    </Root>
  );
};

export default MobilePage;
