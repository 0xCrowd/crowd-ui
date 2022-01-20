import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import { useFormik } from "formik";

import Input from "@app/components/input";
import Button, { ButtonSize } from "@app/components/button";

import { initialValues, validate, IPartyFormData } from "./constants";

//#region styles
import { css } from "@linaria/core";
import { mb12 } from "@assets/styles/atomic";

const label = css`
  font-size: 12px;
`;

const button = css`
  width: 100%;
`;
//#endregion

interface PropsType {
  loading: boolean;
  disabledSubmit?: boolean;
  onSubmit: (data: IPartyFormData) => void;
}

const PartyForm = ({
  loading,
  disabledSubmit,
  onSubmit,
}: PropsType): ReactElement => {
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
    validate: validate,
  });

  return (
    <form onSubmit={handleSubmit} id="party-form-data">
      <Input
        className={mb12}
        labelClassName={label}
        id="url"
        label={<>URL of the fixed price NFT on <a href="rinkeby.rarible.com">rinkeby.rarible.com</a></>}
        placeholder="https://rinkeby.rarible.com/token/id"
        value={values.url}
        onChange={handleChange}
        error={touched.url && errors.url ? errors.url : ""}
      />
      <Button
        size={ButtonSize.large}
        className={button}
        form="party-form-data"
        type="submit"
        loading={loading}
        disabled={disabledSubmit}
      >
        Preview
      </Button>
    </form>
  );
};

export default PartyForm;
