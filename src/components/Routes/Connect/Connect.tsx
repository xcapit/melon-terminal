import React, { useContext } from 'react';
import styled from 'styled-components';
import { ConnectionContext } from '../../Contexts/Connection';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';

const Wrapper = styled.div`
  margin: 20px;
`;

export const Connect = () => {
  const { provider, set } = useContext(ConnectionContext);

  return (
    <Wrapper>
      <ConnectionSelector current={provider} set={set} />
    </Wrapper>
  );
};

export default Connect;
