import React, { FC } from "react";

import Button, { ButtonProps, ButtonSize } from "@components/button";

//#region styles
import { styled } from "@linaria/react";
import { cx } from "@linaria/core";

import { h100 } from "@assets/styles/atomic";

type StyleProps = {
  height: number;
  width: number;
};

const Root = styled.div<StyleProps>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  background: linear-gradient(97.56deg, #00f0ff 8.07%, #ff1cf7 91.93%);
  padding: 2px;
`;
//#endregion

const GradientBorderButton: FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <Root
      height={
        restProps.size === ButtonSize.large ? 54 : ButtonSize.middle ? 36 : 32
      }
      width={
        restProps.size === ButtonSize.large
          ? 200
          : ButtonSize.middle
          ? 176
          : 304
      }
      className={className}
    >
      <Button {...restProps} className={h100}>
        {children}
      </Button>
    </Root>
  );
};

export default GradientBorderButton;
