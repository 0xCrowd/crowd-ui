export interface IProposalFormData {
  price: string;
}

export const initialValues: IProposalFormData = {
  price: '',
};

export const validate = (values: IProposalFormData): ErrorType => {
  const errors: ErrorType = {};
  
  const rx = /^[0-9]*[.,]?[0-9]+$/
  if (!rx.test(values.price)) {
    errors.price = 'Input correct number';
  }

  return errors;
};
