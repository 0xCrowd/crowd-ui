import React, { ReactElement } from 'react';

import Input from '@app/components/input';
import Button, { ButtonSize } from '@app/components/button';
import { useFormik } from 'formik';

import { IProposalFormData, validate, initialValues } from './constants';

//#region styles
import { css } from '@linaria/core';
import { mb12 } from '@assets/styles/atomic';

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
      values.price = values.price.replace(',', '.');
      onSubmit(values);
    },
    validate: validate,
  });

  return (
    <form onSubmit={handleSubmit} id="proposal">
      <Input
        className={mb12}
        label="Sell Price"
        id="price"
        placeholder="ETH 1000"
        value={values.price}
        onChange={handleChange}
        error={touched.price && errors.price || ''}
      />
      <Button
        className={button}
        form="proposal"
        type="submit"
        loading={loading}
        size={ButtonSize.large}
      >
        Create
      </Button>
    </form>
  )
}

export default ProposalForm;
