import { validateUrl } from '@app/utils/validateUrl';

export interface IProposalFormData {
  header: string;
  description: string;
}

export const initialValues: IProposalFormData = {
  header: '',
  description: '',
};

export const validate = (values: IProposalFormData): ErrorType => {
  const errors: ErrorType = {};
  if (!values.header) {
    errors.partyName = 'Обязательное поле';
  } else if (values.header.length > 10) {
    errors.header = 'Не больше 10 символов';
  }

  if (!values.description) {
    errors.description = 'Обязательное поле';
  } else if (values.description.length > 10) {
    errors.description = 'Не больше 10 символов';
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