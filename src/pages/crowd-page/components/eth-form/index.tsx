import React, { ReactElement, useState } from 'react';
import Loader from 'react-loader-spinner';

import Input from '@app/components/input';
import Button from '@app/components/button';

import { IEthFormData } from '@pages/crowd-page';

//#region styles
import { css } from '@linaria/core';
import { mb12 } from '@assets/styles/constants';


const buttonContainer = css`
  width: 100% !important;
`;

const button = css`
  width: 100%;
`;
//#endregion


interface Props {
  loading: boolean;
  onSubmit: (data: IEthFormData) => void
}

const EthForm = ({ onSubmit, loading }: Props): ReactElement => {
  const [deposite, setDeposite] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ deposite });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={mb12}
        label="Deposite"
        id="deposite"
        placeholder="ETH 100000"
        value={deposite}
        onChange={(e) => setDeposite(e.target.value)}
      />
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="data"
        type="submit"
      >
        {loading ? (
          <Loader
            type="Puff"
            color="#6200E8"
            height={20}
            width={20}
            timeout={3000}
          />
          )  : 'Preview'}
      </Button>
    </form>
  )
}

export default EthForm;
