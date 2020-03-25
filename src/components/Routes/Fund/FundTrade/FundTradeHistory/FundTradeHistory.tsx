import React from 'react';
import { Spinner } from '~/storybook/Spinner/Spinner';
import {
  ScrollableTable,
  Table,
  HeaderCell,
  HeaderRow,
  BodyCell,
  BodyRow,
  NoEntries,
  HeaderCellRightAlign,
  BodyCellRightAlign,
} from '~/storybook/Table/Table';
import { Block } from '~/storybook/Block/Block';
import { SectionTitle } from '~/storybook/Title/Title';
import { useFundTradeHistoryQuery } from './FundTradeHistory.query';
import { FormattedDate } from '~/components/Common/FormattedDate/FormattedDate';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';

export interface FundTradeHistoryProps {
  address: string;
}

export const FundTradeHistory: React.FC<FundTradeHistoryProps> = ({ address }) => {
  const [trades, query] = useFundTradeHistoryQuery(address);

  return (
    <Block>
      <SectionTitle>Order History</SectionTitle>

      {query.loading && <Spinner />}
      {!query.loading && !trades.length && <NoEntries>No entries.</NoEntries>}
      {!query.loading && trades.length > 0 && (
        <ScrollableTable>
          <Table>
            <thead>
              <HeaderRow>
                <HeaderCell>Time</HeaderCell>
                <HeaderCell>Exchange</HeaderCell>
                <HeaderCellRightAlign>Buy quantity</HeaderCellRightAlign>
                <HeaderCell>Buy asset</HeaderCell>
                <HeaderCellRightAlign>Sell quantity</HeaderCellRightAlign>
                <HeaderCell>Sell asset</HeaderCell>
                <HeaderCell>Type</HeaderCell>
              </HeaderRow>
            </thead>
            <tbody>
              {trades.map(trade => (
                <BodyRow key={trade.id}>
                  <BodyCell>
                    <FormattedDate timestamp={trade.timestamp} />
                  </BodyCell>
                  <BodyCell>{trade.exchange?.name}</BodyCell>
                  <BodyCellRightAlign>
                    <FormattedNumber tooltip={true} value={trade.buyQuantity} />
                  </BodyCellRightAlign>
                  <BodyCell>{trade.buyAsset?.symbol}</BodyCell>
                  <BodyCellRightAlign>
                    <FormattedNumber tooltip={true} value={trade.sellQuantity} />
                  </BodyCellRightAlign>
                  <BodyCell>{trade.sellAsset?.symbol}</BodyCell>
                  <BodyCell>{trade.methodName}</BodyCell>
                </BodyRow>
              ))}
            </tbody>
          </Table>
        </ScrollableTable>
      )}
    </Block>
  );
};
