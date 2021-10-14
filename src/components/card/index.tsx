import React, { PropsWithChildren, ReactElement } from 'react';

//#region styles
import { styled } from '@linaria/react';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px 38px;
  background: linear-gradient(0deg, rgba(63, 155, 215, 0.18), rgba(63, 155, 215, 0.18));
  box-shadow: 0px -4px 12px rgba(63, 155, 215, 0.12);
  backdrop-filter: blur(40px);
  border-radius: 10px;
`;
//#endregion

interface Props {
  className?: string;
}

const Card = ({ className, children }: PropsWithChildren<Props>): ReactElement => {
  return (
    <Root className={className}>
      {children}
    </Root>
  )
}

export default Card;
