import React, { FC } from 'react';
import cn from 'classnames';

import { PercentEnum } from '@app/enums/percentage';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  background: #00F0FF;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  padding: 7px 16px;
`;

const Main = styled.div`
  background: #D2FF53;
  border-radius: 10px;
  height: 5px;
  position: relative;
`;

interface PercentProps {
  number: number;
}
const Percent = styled.div<PercentProps>`
  position: absolute;
  left: 0;
  background: #009606;
  border-radius: 10px;
  width: ${({ number }) => `${number}%`};
  height: 5px;
`;
//#endregion


type PropsType = {
  number: number;
  mainClassName?: string;
  precentClassName?: string;
  className?: string;
}

const Percentage: FC<PropsType> = ({ number, mainClassName, precentClassName, className }) => {
  return (
    <Root className={className}>
      <Main className={mainClassName}>
        <Percent className={precentClassName} number={number > 100 ? 100 : number}></Percent>
      </Main>
    </Root>
  );
};

export default Percentage;
