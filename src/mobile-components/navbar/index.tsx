import React, { useState } from "react";

import Button, { ButtonMode } from "@app/components/button";
import { UserAccount } from "../user-account";
import MobileMenu from "../menu";

//#region styles
import { styled } from "@linaria/react";
import { css } from "@linaria/core";

import BurgerLogo from "@assets/images/burger.svg";

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 18px;
  background: linear-gradient(
    0deg,
    rgba(38, 50, 56, 0.4),
    rgba(38, 50, 56, 0.4)
  );
`;

const Burger = styled.img`
  cursor: pointer;
`;

const mobileLink = css`
  font-weight: 700;
  height: 24px;
  font-size: 14px;
`;
//#endregion

type Props = {
  account: string;
  onAddNew?: () => void;
  className?: string;
};

export const MobileNavbar = ({ account, className, onAddNew }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Root className={className}>
      <Burger src={BurgerLogo} alt="burger" onClick={() => setIsMenuOpen(true)}/>
      <Button mode={ButtonMode.link} className={mobileLink} onClick={onAddNew}>
        + start a crowd
      </Button>
      <UserAccount text={account} />
      {isMenuOpen && <MobileMenu onAddNew={onAddNew} onClose={() => setIsMenuOpen(false)}/>}
    </Root>
  );
};
