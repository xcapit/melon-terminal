import React, { useContext } from 'react';
import { ConnectionContext } from '../../Contexts/Connection';
import * as S from './Footer.styles';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const connection = useContext(ConnectionContext);

  return (
    <S.FooterPosition>
      <S.Footer>
        {connection && <Link to="/playground/onchain">OnChain Playground</Link>}
        {connection && <Link to="/playground/thegraph">TheGraph Playground</Link>}
      </S.Footer>
    </S.FooterPosition>
  );
};
