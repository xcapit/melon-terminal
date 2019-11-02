import React from 'react';
import * as S from './ProgressBar.styles';

export interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = props => {
  const percentage = Math.min(100, Math.max(0, props.progress));

  return (
    <S.ProgressBar>
      <S.Progress style={{ width: `${percentage}%` }} />
    </S.ProgressBar>
  );
};
