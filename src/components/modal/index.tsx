import React, { PropsWithChildren, ReactElement } from 'react';
import cn from 'classnames';
import Modal from "react-modal";

//#region styles
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { media } from '@app/assets/styles/atomic';

import close from '@assets/images/close.svg';
import closeDark from '@assets/images/closeDark.svg';
import back from '@assets/images/back.svg';

const modal = css`
  box-sizing: border-box;
  width: 400px;
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  padding: 34px 18px 28px 18px;
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #263238;
  border-radius: 15px;
  border: 2px solid #363636;
  z-index: 1000;

  @media (max-height: 800px) {
    max-height: 650px;
  }

  ${media('mobile')} {
    width: 340px;
  }
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, 0.6);
  z-index: 900;
`;

const Header = styled.p`
  margin-bottom: 24px;
  margin-top: 0;
  text-align: center;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #263238;
`;

interface ButtonProps {
  isLight: boolean;
}

const CloseButton = styled.button<ButtonProps>`
  position: absolute;
  top: 28px;
  right: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  background: ${({ isLight }) => isLight ? '#263238' : '#fff'};
  border-radius: 50%;
  cursor: pointer;
  border: none;
`;

const BackIcon = styled.img`
  position: absolute;
  top: 41px;
  left: 35px;
`;
//#endregion

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onBack?: () => void;
  preventScroll?: boolean;
  title?: string;
  className?: string;
  overlayClassName?: string;
  isLight?: boolean;
}

const CustomModal = ({
  isOpen,
  onRequestClose,
  onBack,
  preventScroll = true,
  title,
  className,
  overlayClassName,
  isLight = true,
  children,
}: PropsWithChildren<Props>): ReactElement => {
  console.log(onBack, 'b');
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
      preventScroll={preventScroll}
      className={cn(modal, className)}
      overlayClassName={cn(overlay, overlayClassName)}
      >
        <>
          {title ? <Header>{title}</Header> : null}
          {children}
          <CloseButton onClick={onRequestClose} isLight={isLight}>
            <img src={isLight ? closeDark : close} alt="close" />
          </CloseButton>
          {onBack && <BackIcon src={back} alt="back icon" onClick={onBack} />}
        </>
      </Modal>
  )
}

export default CustomModal;
