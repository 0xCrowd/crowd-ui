import { styled } from '@linaria/react';

type Props = {
  justify?: string;
  alignItems?: string;
};

export const Row = styled.div<Props>`
  display: flex;
  justify-content: ${({ justify }) => justify || 'start'};
  align-items: ${({ alignItems }) => alignItems || 'center'}
`;