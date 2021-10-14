import React, { PropsWithChildren, ReactElement } from 'react';
import cn from 'classnames';
import Modal from "react-modal";

//#region styles
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import close from '@assets/images/close.svg';

const modal = css`
  box-sizing: border-box;
  width: 400px;
  position: absolute;
  top: 40px;
  left: 40px;
  right: 40px;
  bottom: 40px;
  padding: 18px;
  background: #263238;
  border-radius: 15px;
  border: 2px solid #363636;
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Header = styled.p`
  margin-bottom: 30px;
  margin-top: 22px;
  text-align: center;
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  text-shadow: 0px 0px 8px rgba(38, 50, 56, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 36px;
  right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  background: #FFFFFF;
  border-radius: 50%;
  cursor: pointer;
  border: none;
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
  preventScroll?: boolean;
  title?: string;
  className?: string;
  overlayClassName?: string;
}

const CustomModal = ({
  isOpen,
  onRequestClose,
  preventScroll = true,
  title,
  className,
  overlayClassName,
  children,
}: PropsWithChildren<Props>): ReactElement => {
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
          <CloseButton onClick={onRequestClose}>
            <img src={close} alt="close" />
          </CloseButton>
        </>
      </Modal>
  )
}

export default CustomModal;
