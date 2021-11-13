export interface IProposalFormData {
  price: string;
}

export const initialValues: IProposalFormData = {
  price: '',
};

export const validate = (values: IProposalFormData): ErrorType => {
  const errors: ErrorType = {};
  
  const rx = /^\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/;
  if (!rx.test(values.price)) {
    errors.price = 'Input correct number';
  }

  return errors;
};
