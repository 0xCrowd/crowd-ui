import React, { ReactElement, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useFormik } from 'formik';

import Input from '@app/components/input';
import Button, { ButtonSize } from '@app/components/button';

import { IEthFormData, initialValues, validate } from './constants';

//#region styles
import { css } from '@linaria/core';
import { mb12 } from '@assets/styles/atomic';

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
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: values => {
      values.deposite = values.deposite.replace(',', '.');
      onSubmit(values);
    },
    validate,
  });
  console.log(loading, 'lll');
  return (
    <form onSubmit={handleSubmit} id="eth">
      <Input
        className={mb12}
        label="Deposit"
        id="deposite"
        placeholder="ETH 100000"
        value={values.deposite}
        onChange={handleChange}
        error={(touched.deposite && errors.deposite) ? errors.deposite : ''}
      />
      <Button
        className={button}
        form="eth"
        type="submit"
        loading={loading}
        size={ButtonSize.large}
      >
        Add funds
      </Button>
    </form>
  )
}

export default EthForm;
