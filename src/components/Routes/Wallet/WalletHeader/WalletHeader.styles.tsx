import styled from 'styled-components';

export const WalletHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (${props => props.theme.mediaQueries.m}) {
    flex-direction: row;
  }
`;

export const WalletHeaderTitle = styled.h1`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  &::after {
    border: none;
  }
`;

export const WalletHeaderText = styled.div`
  margin-top: ${props => props.theme.spaceUnits.xs};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WalletHeaderHeadline = styled.div`
  padding-right: ${props => props.theme.spaceUnits.s};
`;

export const WalletHeaderLinks = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.otherColors.grey};
  font-size: ${props => props.theme.fontSizes.s};
`;
