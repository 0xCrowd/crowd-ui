import React, { FC } from 'react';
import cn from 'classnames';

//#region styles
import { styled } from '@linaria/react';

interface ButtonProps {
  isLight?: boolean;
  active: boolean;
}

const Root = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 176px;
  width: ${({ active }) => active ? '176px' : '164px'};
  background: linear-gradient(97.56deg, #00F0FF 8.07%, #FF1CF7 91.93%);
  border-radius: 10px;
`;

const StyledButton = styled.button<ButtonProps>`
  flex-shrink: 0;
  height: ${({ active }) => active ? '50px' : '54px'};
  width: ${({ active }) => active ? '172px' : '164px'};
  background: ${({ isLight }) => isLight ? 'linear-gradient(0deg, #FFFFFF, #FFFFFF), #263238' : '#263238'};
  border: 1px solid #363636;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
  color: ${({ isLight }) => isLight ? '#263238' : '#fff'};
  cursor: pointer;
  outline: none;

  &::focus {
    outline: none;
    border: none;
  }
`;
//#endregion

type PropsType = {
  active?: boolean;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  mode?: 'dark' | 'light';
}

const Button: FC<PropsType> = ({ 
  active = false, 
  form, 
  type, 
  disabled,
  mode,
  className,
  containerClassName,
  children, 
  onClick
}) => {
  return (
    <Root active={active} className={containerClassName}>
      <StyledButton
        className={className}
        onClick={onClick}
        form={form}
        type={type}
        disabled={disabled}
        isLight={mode === 'light'}
        active={active}
      >
        {children}
      </StyledButton>
    </Root>
  );
};

export default Button;
