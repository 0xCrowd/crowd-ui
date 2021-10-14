import React, { ReactElement, useState } from 'react';
import Loader from 'react-loader-spinner';

import Input from '@app/components/input';
import Button from '@app/components/button';

import { IProposalFormData } from '@pages/crowd-page';

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
  onSubmit: (data: IProposalFormData) => void
}

const ProposalForm = ({ onSubmit, loading }: Props): ReactElement => {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      header,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className={mb12}
        label="Header"
        id="header"
        placeholder="Crowd Protocol"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      />
      <Input
        className={mb12}
        label="Description"
        id="description"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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

export default ProposalForm;
