import React, { ReactElement } from "react";
import Loader from "react-loader-spinner";
import { useFormik } from "formik";


import Input from "@app/components/input";
import Button from "@app/components/button";

import { IPartyFormData } from '@pages/main-page';
import { validateUrl } from '@app/utils/validateUrl';

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

const initialValues = {
  url: '',
  tokenName: '',
  partyName: '',
};

const validate = (values: IPartyFormData) => {
  const errors: {[k: string]: string} = {};
  if (!values.partyName) {
    errors.partyName = 'Обязательное поле';
  } else if (values.partyName.length > 10) {
    errors.partyName = 'Не больше 10 символов';
  }

  if (!values.tokenName) {
    errors.tokenName = 'Обязательное поле';
  } else if (values.tokenName.length > 10) {
    errors.tokenName = 'Не больше 10 символов';
  }

  if (!values.url) {
    errors.url = 'Обязательное поле';
  } else if (!validateUrl(values.url)) {
    errors.url = 'Невалидая ссылка';
  }

  return errors;
};

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
    validate,
  });

  return (
    <form onSubmit={handleSubmit} id="data">
      <Input
        className={mb12}
        label="What’s your party name?"
        id="partyName"
        placeholder="Qroud Party"
        value={values.partyName}
        onChange={handleChange}
      />
      <Input
        className={mb12}
        label="If you win, what’s your token?"
        id="tokenName"
        placeholder="$HOLDER"
        value={values.tokenName}
        onChange={handleChange}
      />
      <Input
        className={mb12}
        label="The auction URL is"
        id="url"
        placeholder="https://rarible.com/token/id"
        value={values.url}
        onChange={handleChange}
      />
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="data"
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
