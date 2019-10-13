import styled from 'styled-components';

export const Method = styled.div`
  padding: ${props => props.theme.spaceUnits.l};
  background-color: ${props => props.theme.mainColors.secondary};
  border: 1px solid ${props => props.theme.mainColors.border};
  margin: ${props => props.theme.spaceUnits.l} 0;
`;
