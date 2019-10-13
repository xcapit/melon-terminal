import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './Footer.styles';

export const Footer: React.FC = () => {
  return (
    <S.FooterPosition>
      <S.Footer>
        <Link to="/playground/onchain">OnChain Playground</Link>
        <Link to="/playground/thegraph">TheGraph Playground</Link>
      </S.Footer>
    </S.FooterPosition>
  );
};
