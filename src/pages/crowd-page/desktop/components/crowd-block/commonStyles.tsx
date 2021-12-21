import { textGray, textPrimary } from '@app/assets/styles/constants';
import { styled } from '@linaria/react';

export const PrimaryText = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${textPrimary};
`;

export const SecondaryText = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${textGray};
`;

export const InfoText = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${textPrimary}
`;
