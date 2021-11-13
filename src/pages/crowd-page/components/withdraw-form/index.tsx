import React, { ReactElement, useState } from 'react';
import Loader from 'react-loader-spinner';

import Input from '@app/components/input';
import Button from '@app/components/button';

import { IEthFormData } from '../eth-form/constants';

//#region styles
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import { mb12 } from '@assets/styles/constants';

const buttonContainer = css`
  width: 100% !important;
`;

const button = css`
  width: 100%;
`;

const Badge = styled.button`
  height: 18px;
  padding: 0 15px;
  margin-bottom: 16px;
  background: #DEFDFF;
  border-radius: 5px;
  line-height: 18px;
  border: none;
  font-size: 8px;
  color: #00A3FF;
  cursor: pointer;
`;
//#endregion


interface Props {
  loading: boolean;
  onSubmit: (data: IEthFormData) => void;
  onAmountButtonClick: (setValue: (value: string) => void) => void;
}

const WithdrawForm = ({ onSubmit, onAmountButtonClick, loading }: Props): ReactElement => {
  const [deposite, setDeposite] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ deposite });
  };

  return (
    <form onSubmit={handleSubmit} id="withdraw">
      <Input
        className={mb12}
        label="Withdraw amount"
        id="withdraw"
        placeholder="ETH 100000"
        value={deposite}
        onChange={(e) => setDeposite(e.target.value)}
        badge={<Badge onClick={() => onAmountButtonClick(setDeposite)}>Use full Balance</Badge>}
      />
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="withdraw"
        type="submit"
      >
        {loading ? (
          <Loader
            type="Puff"
            color="#6200E8"
            height={20}
            width={20}
          />
          )  : 'Withdraw'}
      </Button>
    </form>
  )
}

export default WithdrawForm;
