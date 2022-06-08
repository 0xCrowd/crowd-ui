import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import Button, { ButtonMode, ButtonSize } from "@components/button";

import { RouteNames } from "../../router/route-names";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";
import { textPrimary } from "@app/assets/styles/constants";

import eth from "@app/assets/images/eth_wh.png";
import logo from "@assets/images/logo.png";

const Root = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 23px;
  padding-right: 71px;
  background: #263238;
`;

const Logo = styled.img`
  margin-right: 12px;
  width: 54px;
  height: 44px;
  cursor: pointer;
`;

const LogoText = styled.a`
  margin: 0;
  margin-right: 64px;
  font-family: "Alata", sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #ffffff;
  outline: none;
  text-decoration: none;
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 316px;
  margin-right: 67px;
`;

const Price = styled.p`
  margin: 0;
  margin-right: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #ffffff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

const MenuLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: ${textPrimary}
  text-decoration: none;
`;

const gradientButton = css`
  width: 140px;
`;

const activeLink = css`
  text-decoration: underline;
`;
//#endregion

interface Props {
  balance: string;
  location: string;
  onAddNew?: () => void;
  className?: string;
}

const Navbar = ({ balance, location, onAddNew, className }: Props): ReactElement => {
  return (
    <Root className={className}>
      <Row>
        <a href="/">
          <Logo src={logo} alt="logo" />
        </a>
        <LogoText href="/">Crowd</LogoText>
      </Row>
      <PriceBlock>
        <ButtonBlock>
          <MenuLink
            href="https://solar-peripheral-f65.notion.site/How-to-use-CrowdApp-4b034d8dd0544628b7d25be5cee6849d"
            target="_blank"
          >
            About us
          </MenuLink>
          <Link to={RouteNames.MY_CROWDS}>
            <Button mode={ButtonMode.link} className={location === '/my-crowds' ? activeLink : undefined}>My crowds</Button>
          </Link>
          <Button
            mode={ButtonMode.gradient}
            rounded
            className={gradientButton}
            size={ButtonSize.small}
            onClick={onAddNew}
          >
            Start a Crowd
          </Button>
        </ButtonBlock>
        <Price>{balance}</Price>
        <Icon src={eth} alt="eth" />
      </PriceBlock>
    </Root>
  );
};

export default Navbar;
