import React, { ReactElement } from "react";
import { useFormik } from "formik";

import Input from "@app/components/input";
import Button, { ButtonSize } from "@app/components/button";

import { initialValues, validate, IEthFormData } from "../eth-form/constants";

//#region styles
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { mb12 } from "@assets/styles/atomic";

const button = css`
  width: 100%;
`;

const Badge = styled.button`
  height: 18px;
  padding: 0 15px;
  margin-bottom: 16px;
  background: #defdff;
  border-radius: 5px;
  line-height: 18px;
  border: none;
  font-size: 8px;
  color: #00a3ff;
  cursor: pointer;
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
      validate,
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
