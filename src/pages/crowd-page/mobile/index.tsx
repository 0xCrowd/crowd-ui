import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CrowdTab from "./components/corwd-tab/index";
import ProposalTab from "./components/proposal-tab/index";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "@app/assets/styles/atomic";

import logo from "@assets/images/logo.png";
import close from "@assets/images/closeDark.svg";
import rarible from "@assets/images/rarible.svg";
import { textPrimary } from "@app/assets/styles/constants";
import TabButton from "@app/mobile-components/tab-button";
import { CrowdPageEnum } from "../../../enums/crowd-page-enum/index";
import Tabs from "@app/mobile-components/tabs";

const Root = styled.div`
  ${media("large")} {
    display: none;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 521px;
  background: url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg");
  background-size: cover;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 0.78) 0%,
    rgba(20, 20, 20, 0.18) 28.13%,
    rgba(255, 255, 255, 0) 50%,
    rgba(20, 20, 20, 0.22) 69.79%,
    #141414 99.99%,
    rgba(20, 20, 20, 0.79) 100%
  );
  filter: drop-shadow(0px 0px 10px rgba(38, 50, 56, 0.06));
`;

const Topline = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 24px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const Close = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 5px;
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  width: 80%;
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: ${textPrimary};
  text-align: center;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Rarible = styled.img`
  height: 24px;
  width: 24px;
`;

const Main = styled.div`
  padding-left: 36px;
  padding-right: 36px;

  ${media("mobile")} {
    padding-bottom: 26px;
  }
`;

//#endregion

const MobilePage = () => {
  const { push } = useHistory();

  const [activeTab, setActiveTab] = useState(CrowdPageEnum.info);

  return (
    <Root>
      <PreviewContainer>
        <Preview>
          <InfoBlock>
            <Title>PartyName</Title>
          </InfoBlock>
        </Preview>
      </PreviewContainer>
      <Main>
        <Tabs>
          <TabButton
            onClick={() => setActiveTab(CrowdPageEnum.info)}
            active={activeTab === CrowdPageEnum.info}
          >
            Info
          </TabButton>
          <TabButton
            onClick={() => setActiveTab(CrowdPageEnum.voting)}
            active={activeTab === CrowdPageEnum.voting}
          >
            Voting
          </TabButton>
        </Tabs>
        {activeTab === CrowdPageEnum.info ? <CrowdTab /> : <ProposalTab />}
      </Main>
    </Root>
  );
};

export default MobilePage;
