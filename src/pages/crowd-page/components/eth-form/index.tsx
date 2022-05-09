import React, { ReactElement, useCallback } from 'react';
import { useFormik } from 'formik';

import Input from '@app/components/input';
import Button, { ButtonSize } from '@app/components/button';
import { Badge } from '@app/components/badge';

import { IEthFormData, initialValues, validate } from './constants';

//#region styles
import { css } from '@linaria/core';
import { mb12 } from '@assets/styles/atomic';

const button = css`
  width: 100%;
`;
//#endregion


interface Props {
  loading: boolean;
  max: number;
  userBalance: number;
  onSubmit: (data: IEthFormData) => void;
}

const EthForm = ({ onSubmit, loading, max, userBalance }: Props): ReactElement => {
  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: values => {
      values.deposite = values.deposite.replace(',', '.');
      onSubmit(values);
    },
    validate: validate(max, userBalance),
  });

  const setDeposit = useCallback(() => {
    setFieldValue('deposite', max.toString());
  }, [max, setFieldValue]);

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
        autoComplete="off"
        badge={
          <Badge
            onClick={setDeposit}
            type="button"
          >
            Add remaining buyout funds
          </Badge>
        }
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
