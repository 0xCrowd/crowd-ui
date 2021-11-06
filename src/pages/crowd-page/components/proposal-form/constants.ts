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
    errors.header = 'Required field';
  } else if (values.header.length > 30) {
    errors.header = 'Не больше 10 символов';
  }

  if (!values.description) {
    errors.description = 'Required field';
  } else if (values.description.length > 100) {
    errors.description = 'Не больше 10 символов';
  }

  return errors;
};
