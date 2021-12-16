import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import UserBadge from "@app/components/user-badge";
import Tabs from "./components/tabs";
import CrowdTab from "./components/corwd-tab/index";
import ProposalTab from './components/proposal-tab/index';

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { media } from "@app/assets/styles/atomic";

import logo from "@assets/images/logo.png";
import close from "@assets/images/closeDark.svg";
import rarible from "@assets/images/rarible.svg";



const Root = styled.div`
  ${media('large')} {
    display: none;
  }
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 521px;
  background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hashmask_15753.jpg/1024px-Hashmask_15753.jpg');
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
  flex-direction: column;
  padding-bottom: 18px;
  padding-left: 36px;
  padding-right: 24px;
`;

const Title = styled.p`
  margin-bottom: 4px;
  margin-top: 0;
  font-family: Inter;
  font-weight: 800;
  font-size: 28px;
  line-height: 32px;
  color: #fff;
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

  ${media('mobile')} {
    padding-bottom: 26px;
  }
`;

const tabs = css`
  margin-bottom: 18px;
`;

const userText = css`
  color: #fff;
`;
//#endregion

export enum CrowdTabs {
  Party = "party",
  Proposal = "proposal",
}

const MobilePage = () => {
  const { push } = useHistory();

  const [activeTab, setActiveTab] = useState(CrowdTabs.Party);

  return (
    <Root>
      <PreviewContainer>
        <Preview>
          <Topline>
            <Logo src={logo} alt="logo" />
            <Close src={close} alt="close" onClick={() => push('/')} />
          </Topline>
          <InfoBlock>
            <Title>PartyName</Title>
            <UserRow>
              <UserBadge name="user" textClassName={userText} />
              <Rarible src={rarible} alt="rarible" />
            </UserRow>
          </InfoBlock>
        </Preview>
      </PreviewContainer>
      <Main>
        <Tabs active={activeTab} onChange={setActiveTab} className={tabs} />
        {activeTab === CrowdTabs.Party ? <CrowdTab /> : <ProposalTab />}
      </Main>
    </Root>
  );
};

export default MobilePage;
