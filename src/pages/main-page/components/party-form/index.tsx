import React, { ReactElement, useState } from "react";
import Loader from "react-loader-spinner";

import Input from "@app/components/input";
import Button from "@app/components/button";

import { IPartyFormData } from '@pages/main-page';

//#region styles
import { css } from "@linaria/core";
import { mb18 } from "@assets/styles/constants";

const buttonContainer = css`
  width: 100% !important;
`;

const button = css`
  width: calc(100% - 4px);
`;
//#endregion

interface PropsType {
  loading: boolean;
  onSubmit: (data: IPartyFormData) => void;
};

const PartyForm = ({ loading, onSubmit }: PropsType): ReactElement => {
  const [url, setUrl] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [partyName, setPartyName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      url,
      partyName,
      tokenName
    });
  };

  return (
    <form onSubmit={handleSubmit} id="data">
      <Input
        className={mb18}
        label="What’s your party name?"
        id="name"
        placeholder="Qroud Party"
        value={partyName}
        onChange={(e) => setPartyName(e.target.value)}
      />
      <Input
        className={mb18}
        label="If you win, what’s your token?"
        id="token"
        placeholder="$HOLDER"
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
      />
      <Input
        className={mb18}
        label="The auction URL is"
        id="url"
        placeholder="https://zora.co/void/123"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button
        containerClassName={buttonContainer}
        className={button}
        form="data"
        type="submit"
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
