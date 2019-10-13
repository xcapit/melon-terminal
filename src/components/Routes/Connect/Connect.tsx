import React from 'react';
import { ConnectionSelector } from '~/components/Common/ConnectionSelector/ConnectionSelector';
import * as S from './Connect.styles';

export const Connect = () => {
  return (
    <>
      <S.Connect>
        <h1>Select your preferred connection method</h1>
        <ConnectionSelector />
      </S.Connect>
    </>
  );
};

export default Connect;
