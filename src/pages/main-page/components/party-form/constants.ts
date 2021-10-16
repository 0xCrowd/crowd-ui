import { validateUrl } from '@app/utils/validateUrl';

export interface IPartyFormData {
  url: string;
  partyName: string;
  tokenName: string;
}

export const initialValues: IPartyFormData = {
  url: '',
  tokenName: '',
  partyName: '',
};

export const validate = (values: IPartyFormData): ErrorType => {
  const errors: ErrorType = {};
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

export const inputs = [
  {
    label: "What’s your party name?",
    id: "partyName",
    placeholder:"Qroud Party",
  },
  {
    label: "If you win, what’s your token?",
    id: "tokenName",
    placeholder: "$HOLDER",
  },
  {
    label: "The auction URL is",
    id: "url",
    placeholder: "https://rarible.com/token/id",
  },
];