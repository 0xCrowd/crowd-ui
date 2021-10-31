import React, { ReactElement } from "react";

import { TabsEnum } from '@enums/tabs/index';

//#region styles
import { styled } from "@linaria/react";
import { media } from "@app/assets/styles/constants";

import plusWhite from '@assets/images/plus_wh.svg';
import logo from '@assets/images/logo.png';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  padding-top: 14px;
  padding-left: 24px;
  padding-right: 18px;
  margin-bottom: 40px;

  ${media('large')} {
    display: none;
  }
`;

const Tabs = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 36px;
  width: 196px;
  padding: 3px;
  background: linear-gradient(
      267.73deg,
      rgba(0, 240, 255, 0.6) 3.21%,
      rgba(255, 28, 247, 0.6) 94.63%
    ),
    #ffffff;
  border-radius: 30px;
`;

interface ButtonProps {
  active: boolean;
}

const TabButton = styled.button<ButtonProps>`
  height: 30px;
  width: 90px;
  background: ${({ active }) => active ? '#141414' : 'transparent'};
  color: ${({ active }) => active ? '#fff' : '#141414'};
  border: none;
  border-radius: 30px;
  font-size: 14px;
`;

const ButtonPlus = styled.button`
  height: 48px;
  width: 48px;
  background: linear-gradient(180deg, #263238 0%, #141414 100%);
  border-radius: 50%;
  border: none;
  outline: none;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
`;
//#endregion

interface Props {
  activeTab: TabsEnum;
  onChange: (value: TabsEnum) => void;
  onAdd: () => void;
}

const MobileTopline = ({ activeTab, onChange, onAdd }: Props): ReactElement => {
  return (
    <Root>
      <Logo src={logo} alt="logo" />
      <Tabs>
        <TabButton 
          active={activeTab === TabsEnum.All}
          onClick={() => onChange(TabsEnum.All)}
        >
          All Crowds
        </TabButton>
        <TabButton
          active={activeTab === TabsEnum.My}
          onClick={() => onChange(TabsEnum.My)}
        >
          My Crowds
        </TabButton>
      </Tabs>
      <ButtonPlus onClick={onAdd}>
        <img src={plusWhite} alt="plus" />
      </ButtonPlus>
    </Root>
  );
};

export default MobileTopline;
