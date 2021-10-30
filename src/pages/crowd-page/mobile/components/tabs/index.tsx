import React, { ReactElement } from "react";

import { Hr } from "@app/components/hr";

import { CrowdTabs } from '../../index';

//#region styled
import { styled } from "@linaria/react";


const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 23px;
`;

interface ButtonProps {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${({ active }) => active ? '#fff' : '#979797'};
  background-color: transparent;
  border: none;
`;
//#endregion

interface Props {
  active: CrowdTabs;
  onChange: (value: CrowdTabs) => void;
  className?: string;
}

const Tabs = ({ active, onChange }: Props): ReactElement => {
  return (
    <>
      <Root>
        <Button 
          active={active === CrowdTabs.Party} 
          onClick={() => onChange(CrowdTabs.Party)}
        >
          Party info
        </Button>
        <Button 
          active={active === CrowdTabs.Proposal} 
          onClick={() => onChange(CrowdTabs.Proposal)}
        >
          Proposals
        </Button>
      </Root>
      <Hr />
    </>
  );
};

export default Tabs;
