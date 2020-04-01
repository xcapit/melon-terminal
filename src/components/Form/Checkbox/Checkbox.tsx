import React from 'react';
import { FieldMetaProps } from 'formik';
import { useField, Wrapper, Error } from '~/components/Form/Form';
import { CheckboxIcon, CheckboxContainer, CheckboxInput, CheckboxMask, CheckboxLabel } from './Checkbox.styles';

export type CheckboxItemProps<TValue = string | boolean> = React.InputHTMLAttributes<HTMLInputElement> &
  FieldMetaProps<TValue> & {
    name: string;
    label?: string;
  };

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, error, ...rest }) => {
  const id = rest.id ?? rest.name;

  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" {...rest} id={id} />

      <CheckboxMask>
        <CheckboxIcon />
      </CheckboxMask>

      {label && <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>}
      {error && <Error>{error}</Error>}
    </CheckboxContainer>
  );
};

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = props => {
  const [field, meta] = useField({ type: 'checkbox', ...props });

  return (
    <Wrapper>
      <CheckboxItem {...props} {...meta} {...field} />
    </Wrapper>
  );
};
