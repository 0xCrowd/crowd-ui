import React, { ReactElement } from "react";
import { useFormik } from "formik";

import Input from "@app/components/input";
import Button, { ButtonSize } from "@app/components/button";
import { Badge } from "@app/components/badge";

import { initialValues, IEthFormData } from "../eth-form/constants";
import { validate } from './constants';

//#region styles
import { css } from "@linaria/core";

import { mb12 } from "@assets/styles/atomic";

const button = css`
  width: 100%;
`;

//#endregion

interface Props {
  loading: boolean;
  onSubmit: (data: IEthFormData) => void;
  onAmountButtonClick: (setValue: (value: string) => void) => void;
}

const WithdrawForm = ({
  onSubmit,
  onAmountButtonClick,
  loading,
}: Props): ReactElement => {
  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        values.deposite = values.deposite.replace(",", ".");
        onSubmit(values);
      },
      validate
    });

  return (
    <form onSubmit={handleSubmit} id="withdraw">
      <Input
        className={mb12}
        label="Withdraw amount"
        id="deposite"
        placeholder="ETH 100000"
        value={values.deposite}
        onChange={handleChange}
        error={(touched.deposite && errors.deposite) ? errors.deposite : ''}
        badge={
          <Badge
            onClick={() =>
              onAmountButtonClick((value) => setFieldValue("deposite", value))
            }
            type="button"
          >
            Use full Balance
          </Badge>
        }
      />
      <Button
        className={button}
        form="withdraw"
        type="submit"
        loading={loading}
        size={ButtonSize.large}
      >
        Withdraw
      </Button>
    </form>
  );
};

export default WithdrawForm;
