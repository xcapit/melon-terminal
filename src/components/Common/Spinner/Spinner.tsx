import React from 'react';
import * as S from './Spinner.styles';

export interface SpinnerProps {
  className?: string;
  overlay?: boolean;
  icon?: boolean;
  text?: string;
  size?: 'default' | 'small' | 'large' | 'inflated';
}

export const Spinner: React.FC<SpinnerProps> = ({
  icon = true,
  text = false,
  overlay = false,
  size = 'default',
  className,
}) => (
  <S.SpinnerPositioning overlay={overlay}>
    <S.Spinner size={size} className={className}>
      <S.Wrapper>
        {icon && <S.Logo name="without-border" />}
        <S.Loader />
      </S.Wrapper>
      {text && <S.Text>{text}</S.Text>}
    </S.Spinner>
  </S.SpinnerPositioning>
);
