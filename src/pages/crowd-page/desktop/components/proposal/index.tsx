import React, { ReactElement } from 'react';

import Card from '@components/card';
import Title from '@components/title';
import Percentage from '@components/percentage';
import Button from '@components/button';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { ProposalTypeEnum } from '@app/enums/proposalTypeEnum';

const Description = styled.div`
  font-family: Inter;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  word-break: break-all;
`;

const titleClass = css`
  margin-bottom: 12px;
  white-space: nowrap; /* Отменяем перенос текста */
  overflow: hidden; /* Обрезаем содержимое */
  text-overflow: ellipsis; /* Многоточие */
`;

const buyoutTitle = css`
  margin-bottom: 12px;
  word-break: break-all;
`;

const card = css`
  height: 192px;
  width: 800px;
`;
//#endregion

interface Props {
  title: string;
  description: string;
  type: ProposalTypeEnum
}

const Proposal = ({ title, description, type }: Props): ReactElement => {
  return (
    <Card className={card}>
      <Title className={type === ProposalTypeEnum.Buyout ? buyoutTitle : titleClass}>{title}</Title>
      {type !== ProposalTypeEnum.Buyout && <Description>{description}</Description>}
    </Card>
  );
};

export default Proposal;
