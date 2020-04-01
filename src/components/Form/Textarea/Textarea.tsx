import React from 'react';
import { useField, Wrapper, Label, Error } from '~/components/Form/Form';
import { TextareaInput } from './Textarea.styles';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ type: 'textarea', ...props });

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <TextareaInput cols={30} rows={5} error={!!meta.error} {...props} {...field} />
      {meta.error && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};
