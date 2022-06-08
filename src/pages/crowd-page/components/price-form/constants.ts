import { toNumber } from 'lodash';

export interface IProposalFormData {
  price: string;
}

export const initialValues: IProposalFormData = {
  price: '',
};

export const validate = (values: IProposalFormData, proposalPrice?: number): ErrorType => {
  const errors: ErrorType = {};
  
  const rx = /^[0-9]*[.,]?[0-9]+$/;
  if (!rx.test(values.price)) {
    errors.price = 'Input correct number';
  }

  if (proposalPrice && toNumber(values.price) > proposalPrice * 5) {
    errors.price = 'The offered price is 5 times more';
  }

  return errors;
};
