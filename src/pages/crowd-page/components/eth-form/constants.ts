export interface IEthFormData {
  deposite: string;
}

export const initialValues: IEthFormData = {
  deposite: '',
};

export const validate = (values: IEthFormData): ErrorType => {
  const errors: ErrorType = {};

  const rx = /^\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;
  if (!rx.test(values.deposite)) {
    errors.deposite = 'Input correct number';
  }

  return errors;
}