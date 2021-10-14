import React, { ReactElement } from "react";

import Button from "@app/components/button";

import { TabsEnum } from "@enums/tabs/index";

//#region styles
import { styled } from "@linaria/react";
import { css } from '@linaria/core';

const Root = styled.div`
  padding: 1px;
  height: 36px;
  width: 220px;
  border-radius: 27px;
  background: linear-gradient(97.56deg, #00f0ff 8.07%, #ff1cf7 91.93%);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-radius: 27px;
  background: #263238;
`;

const acitveButton = css`
  height: 22px;
  width: 90px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`;

const button = css`
  height: 24px;
  width: 92px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`;

const container = css`
  height: 24px;
  width: 92px;
`;

//#endregion

interface Props {
  activeTab: TabsEnum;
  onChange: (value: TabsEnum) => void;
}

const TabButtons = ({ activeTab, onChange }: Props): ReactElement => {
  return (
    <Root>
      <ButtonContainer>
        <Button
          active={activeTab === TabsEnum.All}
          onClick={() => onChange(TabsEnum.All)}
          mode={activeTab === TabsEnum.All ? "light" : "dark"}
          className={activeTab === TabsEnum.All ? acitveButton : button}
          containerClassName={container}
        >
          ALL PARTIES
        </Button>
        <Button
          active={activeTab === TabsEnum.My}
          onClick={() => onChange(TabsEnum.My)}
          mode={activeTab === TabsEnum.My ? "light" : "dark"}
          className={activeTab === TabsEnum.My ? acitveButton : button}
          containerClassName={container}
        >
          MY PARTIES
        </Button>
      </ButtonContainer>
    </Root>
  );
};

export default TabButtons;
