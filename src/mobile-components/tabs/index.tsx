import React, { PropsWithChildren, ReactElement } from "react";

//#region styles
import { styled } from "@linaria/react";
import { textGray } from "@app/assets/styles/constants";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  padding-top: 14px;
  padding-left: 24px;
  padding-right: 18px;
  margin-bottom: 40px;
`;

const TabsWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 18px;
  border-bottom: 0.5px solid ${textGray};
`;
//#endregion

interface Props {
  className?: string;
}

const Tabs = ({ children, className }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root className={className}>
      <TabsWrapper>
        {children}
      </TabsWrapper>
    </Root>
  );
};

export default Tabs;
