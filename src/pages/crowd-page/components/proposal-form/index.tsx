import React, { ReactElement, useState } from 'react';
import Loader from 'react-loader-spinner';

import Input from '@app/components/input';
import Button from '@app/components/button';

import { IProposalFormData, validate, initialValues } from './constants';

//#region styles
import { css } from '@linaria/core';
import { mb12 } from '@assets/styles/constants';
import { useFormik } from 'formik';


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
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: values => {
      onSubmit(values);
    },
    validate: validate,
  });

  return (
    <form onSubmit={handleSubmit} id="proposal">
      <Input
        className={mb12}
        label="Header"
        id="header"
        placeholder="Crowd Protocol"
        value={values.header}
        onChange={handleChange}
        error={touched.header && errors.header || ''}
      />
      <Input
        className={mb12}
        label="Description"
        id="description"
        placeholder="description"
        value={values.description}
        onChange={handleChange}
        error={touched.description && errors.description || ''}
      />
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="proposal"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <Loader
            type="Puff"
            color="#6200E8"
            height={20}
            width={20}
            timeout={3000}
          />
          )  : 'Create'}
      </Button>
    </form>
  )
}

export default ProposalForm;
