import React, { PropsWithChildren } from 'react';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { successText, textPrimary } from '@app/assets/styles/constants';

interface ButtonProps {
  active: boolean;
}

const Root = styled.button<ButtonProps>`
  padding: 0;
  background: transparent;
  color: ${({ active }) => active ? successText : textPrimary};
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const underline = css`
  &:after {
    content: "";
    display: block;
    width: calc(100% - 6px);
    padding-top: 7px;
    margin: auto
    border-bottom: 2px solid ${successText};
  }
`;
//#endregion

type Props = {
  active: boolean;
  onClick?: () => void;
}

const TabButton = ({ active, children, onClick }: PropsWithChildren<Props>) => {
  const onTabClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Root
      onClick={onTabClick}
      active={active}
      className={active ? underline : ''}
    >
      {children}
    </Root>
  )
};

export default TabButton;