import React from "react";
import { Link } from "react-router-dom";

import { Row } from "@app/components/row/Row";
import Button, { ButtonSize } from "@app/components/button";

import { RouteNames } from "../../router/route-names";

//#region styles
import { styled } from "@linaria/react";
import { cx } from "@linaria/core";

import { textPrimary } from "@assets/styles/constants";
import { primaryGreenButton } from "../no-crowds";
import { mb45, mb62, mr12 } from "@assets/styles/atomic";

import close from "@assets/images/closeDark.svg";
import twitter from "@assets/images/twitter.svg";
import discord from "@assets/images/discord.svg";
import telegram from "@assets/images/telegram.svg";
import logo from "@assets/images/logo.png";

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #141414;
  z-index: 1000;
`;

const Topline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  padding-left: 30px;
  padding-right: 30px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 46px);
`;

const Title = styled.div`
  margin: 0
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: ${textPrimary};
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  padding-left: 60px;
`;

const MenuItem = styled.p`
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: ${textPrimary};
`;

const SocialBlock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Description = styled.p`
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${textPrimary};
`;
const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 54px;
  background: #1e1e1e;
  border-radius: 10px;
`;

const Logo = styled.img`
  height: 36px;
  width: 36px;
  margin-right: 24px;
`;

const Close = styled.button`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
`;

const CloseIcon = styled.img`
  width: 100%;
  height: 100%;
`;
//#endregion

type Props = {
  onAddNew?: () => void;
  onClose: () => void;
};

const MobileMenu = ({ onClose, onAddNew }: Props) => {
  const onAddClick = () => {
    onAddNew && onAddNew();
    onClose();
  };

  return (
    <Root>
      <Topline>
        <Row>
          <Logo src={logo} alt="logo" />
          <Title>CROWD Protocol</Title>
        </Row>
        <Close onClick={onClose}>
          <CloseIcon src={close} alt="close" />
        </Close>
      </Topline>
      <Body>
        <Menu>
          <MenuItem>About us</MenuItem>
          <Link to={RouteNames.INDEX}>
            <MenuItem>All crowds</MenuItem>
          </Link>
          <Link to={RouteNames.MY_CROWDS}>
            <MenuItem>My crowds</MenuItem>
          </Link>
        </Menu>
        <SocialBlock>
          <Button
            size={ButtonSize.small}
            className={cx(primaryGreenButton, mb45)}
            onClick={onAddClick}
          >
            + Start a crowd
          </Button>
          <Description>Join Our Comunity</Description>
          <Row className={mb62}>
            <SocialButton
              href="https://twitter.com/0xCrowd"
              target="_blank"
              className={mr12}
            >
              <img src={twitter} alt="twitter" />
            </SocialButton>
            <SocialButton
              href="discord.gg/mmgMGm7m5K"
              target="_blank"
              className={mr12}
            >
              <img src={discord} alt="discord" />
            </SocialButton>
            <SocialButton href="https://t.me/CrowdProtocol" target="_blank">
              <img src={telegram} alt="telegram" style={{ color: "green" }} />
            </SocialButton>
          </Row>
        </SocialBlock>
      </Body>
    </Root>
  );
};

export default MobileMenu;
