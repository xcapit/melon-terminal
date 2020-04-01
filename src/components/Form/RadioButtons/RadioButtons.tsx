import React from 'react';
import { useField, Error, Wrapper, Label } from '~/components/Form/Form';
import * as S from './RadioButtons.styles';

export interface RadioButtonItem extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const RadioButtonItem: React.FC<RadioButtonItem> = ({ label, ...rest }) => {
  const id = rest.id ?? `${rest.name}:${rest.value}`;

  return (
    <S.RadioButtonContainer>
      <S.RadioButtonInput type="radio" {...rest} id={id} />
      <S.RadioButtonMask>
        <S.RadioButtonIcon />
      </S.RadioButtonMask>
      {label && <S.RadioButtonLabel htmlFor={id}>{label}</S.RadioButtonLabel>}
    </S.RadioButtonContainer>
  );
};

export interface RadioButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioButtonGroupProps {
  options: RadioButtonOption[];
  name: string;
  label?: string;
}

export const RadioButtons: React.FC<RadioButtonGroupProps> = ({ options, ...props }) => {
  const [field, meta] = useField({ type: 'radio', ...props });
  const children = options.map(item => {
    const key = `${item.label}:${item.value}`;
    const checked = meta.value === item.value;
    return <RadioButtonItem key={key} {...props} {...field} {...item} checked={checked} />;
  });

  return (
    <Wrapper>
      {props.label && <Label>{props.label}</Label>}
      {children}
      {meta.error && <Error>{meta.error}</Error>}
    </Wrapper>
  );
};
