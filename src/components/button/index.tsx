import React, { FC } from "react";
import Loader from "react-loader-spinner";

//#region styles
import { styled } from "@linaria/react";
import { css, cx } from "@linaria/core";
import { textPrimaryDark } from "@app/assets/styles/constants";

type StyleProps = {
  height: number;
  width: number;
};

const StyledButton = styled.button<StyleProps>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  flex-shrink: 0;
  background-color: #263238;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: Inter;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
  color: #fff;
  border: none;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    background-color: #111618;
  }

  &:active {
    background-color: #fff;
    color: ${textPrimaryDark}
  }
`;

const lightButton = css`
  background-color: linear-gradient(0deg, #ffffff, #ffffff), #263238;
  color: #263238;
`;

const disabledButton = css`
  color: #5c5c5c;
  background: linear-gradient(0deg, #171e22, #171e22),
    linear-gradient(0deg, #263238, #263238),
    linear-gradient(0deg, #141414, #141414), #ffffff;
`;

const gradientButton = css`
  background: linear-gradient(94.13deg, #00f0ff -27.4%, #ff1cf7 95.95%),
    linear-gradient(0deg, #ffffff, #ffffff), #263238;
`;

const roundedButton = css`
  border-radius: 20px;
`;

const linkButton = css`
  width: auto;
  height: 100%;
  padding: 0;
  background: transparent;
  font-size: 14px;
  font-weight: 700;
`;
//#endregion

export enum ButtonMode {
  dark = "dark",
  light = "light",
  gradient = "gradient",
  link = "link",
}

export enum ButtonSize {
  large = "large",
  middle = "middle",
  small = "small",
}

export type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  form?: string;
  disabled?: boolean;
  mode?: ButtonMode;
  rounded?: boolean;
  size?: ButtonSize;
  loading?: boolean;
  onClick?: (e: any) => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  form,
  disabled,
  mode,
  rounded,
  size = ButtonSize.middle,
  loading,
  onClick,
  className,
  children,
}) => {
  return (
    <StyledButton
      height={size === ButtonSize.large ? 54 : ButtonSize.middle ? 36 : 32}
      width={size === ButtonSize.large ? 200 : ButtonSize.middle ? 176 : 304}
      className={cx(
        rounded && roundedButton,
        mode === ButtonMode.gradient && gradientButton,
        mode === ButtonMode.light && lightButton,
        className,
        disabled && disabledButton,
        mode === ButtonMode.link && linkButton
      )}
      onClick={onClick}
      form={form}
      type={type}
      disabled={disabled}
    >
      {loading ? (
        <Loader type="Puff" color="#6200E8" height={20} width={20} />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
