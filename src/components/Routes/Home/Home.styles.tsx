import styled from 'styled-components';

export const HomeHeader = styled.div`
  background-color: ${props => props.theme.mainColors.secondary};
  padding: ${props => props.theme.spaceUnits.s};
  border-bottom: 1px solid ${props => props.theme.mainColors.border};

  @media (${props => props.theme.mediaQueries.s}) {
    padding-left: 7%;
    padding-right: 7%;
  }
`;

export const HomeBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  @media (${props => props.theme.mediaQueries.l}) {
    flex: 1;
  }

  @media (${props => props.theme.mediaQueries.s}) {
    padding-left: 7%;
    padding-right: 7%;
  }
`;
