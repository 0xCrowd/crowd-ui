import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import { useFormik } from "formik";


import Input from "@app/components/input";
import Button from "@app/components/button";

import { initialValues, validate, inputs, IPartyFormData } from './constants';

//#region styles
import { css } from "@linaria/core";
import { mb12 } from "@assets/styles/constants";

const buttonContainer = css`
  width: 100% !important;
`;

const button = css`
  width: 100%;
`;
//#endregion

interface PropsType {
  loading: boolean;
  onSubmit: (data: IPartyFormData) => void;
};

const PartyForm = ({ loading, onSubmit }: PropsType): ReactElement => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    onSubmit: values => {
      onSubmit(values);
    },
    validate: validate,
  });

  return (
    <form onSubmit={handleSubmit} id="party-form-data">
      {inputs.map(({ label, id, placeholder }) => (
        <Input
          className={mb12}
          label={label}
          id={id}
          placeholder={placeholder}
          value={values[id]}
          onChange={handleChange}
        />
      ))}
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="party-form-data"
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
          )  : 'Preview'}
      </Button>
    </form>
  );
};

export default PartyForm;
