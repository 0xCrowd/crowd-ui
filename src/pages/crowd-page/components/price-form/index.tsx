import React, { ReactElement } from 'react';
import { useFormik } from 'formik';

import Input from '@app/components/input';
import Button, { ButtonSize } from '@app/components/button';

import { IProposalFormData, validate, initialValues } from './constants';

//#region styles
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { mb12, mb4 } from '@assets/styles/atomic';

const button = css`
  width: 100%;
`;

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 16px;
`;
//#endregion

interface Props {
  loading: boolean;
  onSubmit: (data: IProposalFormData) => void;
  proposalPrice?: number;
}

const PriceForm = ({ onSubmit, loading, proposalPrice }: Props): ReactElement => {
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: values => {
      values.price = values.price.replace(',', '.');
      onSubmit(values);
    },
    validate: values => validate(values, proposalPrice),
  });

  return (
    <form onSubmit={handleSubmit} id="proposal">
      <Title className={mb4}>What price do you suggest?</Title>
      <Input
        className={mb12}
        label="Your Price"
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
        disabled={loading}
        size={ButtonSize.large}
      >
        Create
      </Button>
    </form>
  )
}

export default PriceForm;
