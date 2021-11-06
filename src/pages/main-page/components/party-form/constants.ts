import { validateUrl } from '@app/utils/validateUrl';

export interface IPartyFormData {
  url: string;
  tokenTicker: string;
  tokenName: string;
}

export const initialValues: IPartyFormData = {
  url: '',
  tokenName: '',
  tokenTicker: '',
};

export const validate = (values: IPartyFormData): ErrorType => {
  const errors: ErrorType = {};
  if (!values.tokenTicker) {
    errors.partyName = 'Required field';
  } else if (values.tokenTicker.length > 10) {
    errors.partyName = 'Не больше 10 символов';
  }

  if (!values.tokenName) {
    errors.tokenName = 'Required field';
  } else if (values.tokenName.length > 10) {
    errors.tokenName = 'Не больше 10 символов';
  }

  if (!values.url) {
    errors.url = 'Required field';
  } else if (!validateUrl(values.url)) {
    errors.url = 'Invalid url';
  }

  const [, , domain, page] = values.url.split("/");

  if (domain === "rarible.com") {
    if (page !== "token") {
      errors.url = 'Invalid url'
    }
  } else if (domain === "opensea.io") {
    if (page !== "assets") {
      errors.url = 'Invalid url'
    }
  } else {
    errors.url = 'Invalid url'
  }

  return errors;
};

export const inputs = [
  {
    label: "If you win, what’s your token?",
    id: "tokenName",
    placeholder: "$HOLDER",
  },
  {
    label: "What’s token ticker?",
    id: "tokenTicker",
    placeholder:"HLD",
  },
  {
    label: "The auction URL is",
    id: "url",
    placeholder: "https://rarible.com/token/id",
  },
];