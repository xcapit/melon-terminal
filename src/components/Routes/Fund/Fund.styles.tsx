import styled from 'styled-components';

export const FundHeader = styled.div`
  background-color: ${props => props.theme.mainColors.secondary};
  padding: ${props => props.theme.spaceUnits.s};
  border-bottom: 1px solid ${props => props.theme.mainColors.border};
`;

export const FundBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media (${props => props.theme.mediaQueries.l}) {
    flex: 1;
  }
`;
