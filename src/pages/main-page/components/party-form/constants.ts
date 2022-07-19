import { RARIBLE_URL } from '@app/constants/rarible-url';
import { validateUrl } from '@app/utils/validateUrl';

export interface IPartyFormData {
  url: string;
}

export const initialValues: IPartyFormData = {
  url: '',
};

export const validate = (values: IPartyFormData): ErrorType => {
  const errors: ErrorType = {};

  if (!values.url) {
    errors.url = 'Required field';
  } else if (!validateUrl(values.url)) {
    errors.url = 'Invalid url';
  }

  const [, , domain, page] = values.url.split("/");

  if (domain === "rarible.com" || domain === RARIBLE_URL) {
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
