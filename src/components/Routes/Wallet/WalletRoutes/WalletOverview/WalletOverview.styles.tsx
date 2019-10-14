import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '~/components/Common/Styles/Styles';

export const WalletOverviewBody = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto ${props => props.theme.spaceUnits.xl};
`;

export const WalletOverviewTitle = styled.h2``;

export const WalletOverviewSection = styled.div`
  margin-bottom: ${props => props.theme.spaceUnits.xl};
`;

export const WalletOverviewBalances = styled(WalletOverviewSection)`
  background-color: ${props => props.theme.mainColors.border};
  padding: ${props => props.theme.spaceUnits.m} 0;
  display: flex;
  text-align: center;
`;

export const WalletOverviewBalance = styled.div`
  flex: 0 0 50%;
  padding: 0 ${props => props.theme.spaceUnits.s};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    content: '';
    border-right: 1px solid ${props => props.theme.mainColors.primary};
  }
`;

export const WalletOverviewBalanceLabel = styled.span`
  display: block;
`;

export const WalletOverviewBalanceValue = styled.span`
  display: block;
  font-weight: bold;
`;

export const WalletOverviewFundActions = styled(WalletOverviewSection)``;

export const WalletOverviewFundAction = styled(PrimaryButton.withComponent(Link))``;
