import styled from 'styled-components';

export const FooterPosition = styled.div`
  position: relative;
  z-index: 200;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  background-color: rgb(249, 242, 219);
  border-top: 1px solid rgb(234, 229, 212);
  font-size: 0.75rem;
`;

export const FooterItem = styled.span`
  text-transform: uppercase;

  &::before {
    content: '|';
    margin-right: ${props => props.theme.spaceUnits.xxs};
    padding-left: ${props => props.theme.spaceUnits.xxs};
    color: ${props => props.theme.otherColors.grey};
  }

  &:first-child::before {
    content: '';
    margin-right: 0;
    padding-left: 0;
  }
`;
