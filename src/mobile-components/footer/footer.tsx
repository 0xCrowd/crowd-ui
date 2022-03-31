import React from "react";

import { Row } from "@app/components/row/Row";

//#region styles
import { styled } from "@linaria/react";

import { mr30, mb30 } from "@assets/styles/atomic";

import twitter from "@assets/images/twitter.svg";
import discord from "@assets/images/discord.svg";
import telegram from "@assets/images/telegram.svg";

const Root = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 190px;
  background: linear-gradient(
    0deg,
    rgba(38, 50, 56, 0.4),
    rgba(38, 50, 56, 0.4)
  );
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FAQLink = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #d4d6d7;
  text-decoration: none;
`;
//#endregion

export const MobileFooter = ({ className }: ClassNameProps) => {
  return (
    <Root className={className}>
      <Wrapper>
        <Row className={mb30}>
          <a className={mr30} href="https://twitter.com/0xCrowd" target="_blank">
            <img src={twitter} alt="twitter" />
          </a>
          <a className={mr30} href="discord.gg/mmgMGm7m5K" target="_blank">
            <img src={discord} alt="discord" />
          </a>
          <a href="https://t.me/CrowdProtocol" target="_blank">
            <img src={telegram} alt="telegram" />
          </a>
        </Row>
        <FAQLink
          href="https://solar-peripheral-f65.notion.site/How-to-use-CrowdApp-4b034d8dd0544628b7d25be5cee6849d"
          target="_blank"
        >
          How to use it?
        </FAQLink>
      </Wrapper>
    </Root>
  );
};
