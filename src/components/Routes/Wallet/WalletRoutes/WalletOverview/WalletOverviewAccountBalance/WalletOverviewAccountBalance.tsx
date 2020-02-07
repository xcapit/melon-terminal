import React from 'react';
import { SectionTitle } from '~/storybook/components/Title/Title';
import { Block } from '~/storybook/components/Block/Block';
import { Spinner } from '~/storybook/components/Spinner/Spinner';
import { TokenValue } from '~/components/Common/TokenValue/TokenValue';
import { useAccountBalanceQuery } from '~/queries/AccountBalances';
import * as S from './WalletOverviewAccount.styles';

export interface WalletOverviewAccountBalanceProps {
  account?: string;
}

export const WalletOverviewAccountBalance: React.FC<WalletOverviewAccountBalanceProps> = ({ account }) => {
  const [balances, query] = useAccountBalanceQuery(account);

  if (query.loading) {
    return (
      <Block>
        <SectionTitle>Account balances</SectionTitle>
        <Spinner />
      </Block>
    );
  }

  return (
    <Block>
      <SectionTitle>Account balances</SectionTitle>
      {balances.map(token => (
        <S.Balance key={token.symbol}>
          <TokenValue value={token.balance} decimals={token.decimals} symbol={token.symbol} />
        </S.Balance>
      ))}
    </Block>
  );
};
