import styled from 'styled-components';

export const FullSubHeader = styled.div`
  background-color: ${props => props.theme.mainColors.secondary};
  padding: ${props => props.theme.spaceUnits.s};
  border-bottom: 1px solid ${props => props.theme.mainColors.border};
`;

export const PaddedSubHeader = styled(FullSubHeader)`
  @media (${props => props.theme.mediaQueries.s}) {
    padding-left: 7%;
    padding-right: 7%;
  }
`;

export const FullBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 200px;

  @media (${props => props.theme.mediaQueries.l}) {
    flex: 1;
  }
`;

export const PaddedBody = styled(FullBody)`
  margin: ${props => props.theme.spaceUnits.xl} 0;

  @media (${props => props.theme.mediaQueries.s}) {
    padding-left: 7%;
    padding-right: 7%;
  }
`;
