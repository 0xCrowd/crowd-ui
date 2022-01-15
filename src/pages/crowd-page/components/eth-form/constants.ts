import { toNumber } from "lodash";

export interface IEthFormData {
  deposite: string;
}

export const initialValues: IEthFormData = {
  deposite: '',
};

export const validate = (max: number, userBalance: number) => (values: IEthFormData): ErrorType => {
  const errors: ErrorType = {};

  const rx = /^[0-9]*[.,]?[0-9]+$/;
  if (!rx.test(values.deposite)) {
    errors.deposite = 'Input correct number';
  }

  if (toNumber(values.deposite) > max) {
    errors.deposite = 'You can’t add more than remaining buyout funds';
  }

  if (userBalance < toNumber(values.deposite)) {
    errors.deposite = 'You don’t have enough funds';
  }

  return errors;
}