export interface IEthFormData {
  deposite: string;
}

export const initialValues: IEthFormData = {
  deposite: '',
};

export const validate = (values: IEthFormData): ErrorType => {
  const errors: ErrorType = {};

  const rx = /^[0-9]*[.,]?[0-9]+$/;
  if (!rx.test(values.deposite)) {
    errors.deposite = 'Input correct number';
  }

  return errors;
}