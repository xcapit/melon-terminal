import React from 'react';
import BigNumber from 'bignumber.js';
import { Block } from '~/storybook/Block/Block';
import { SectionTitle } from '~/storybook/Title/Title';
import { Spinner } from '~/storybook/Spinner/Spinner';
import { PriceChart } from '~/components/Charts/PriceChart/PriceChart';
import { useFund } from '~/hooks/useFund';
import { Depth, Serie } from '~/components/Charts/types';
import { useFetchOffchainPricesByDepth, DepthTimelineItem } from '~/hooks/metricsService/useFetchOffChainPricesByDepth';
import { useFetchFundPricesByDepth } from '~/hooks/metricsService/useFetchFundPricesByDepth';
import { useFetchFundPricesByRange } from '~/hooks/metricsService/useFetchFundPricesByRange';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';

export interface NewFundPerformanceChartProps {
  address: string;
}

export const NewFundPerformanceChart: React.FC<NewFundPerformanceChartProps> = (props) => {
  const fund = useFund();
  const [depth, setDepth] = React.useState<Depth | number>('1m');

  const {
    data: onchainDataByDepth,
    error: onchainDataByDepthError,
    isFetching: onchainDataByDepthFetching,
  } = useFetchFundPricesByDepth(props.address, depth as Depth);

  const {
    data: offchainDataByDepth,
    error: offchainDataByDepthError,
    isFetching: offchainDataByDepthFetching,
  } = useFetchOffchainPricesByDepth(props.address, depth);

  const {
    data: onchainDataByDate,
    error: onchainDataByDateError,
    isFetching: onchainDataByDateFetching,
  } = useFetchFundPricesByRange(props.address, depth);

  const formattedOnchainDataByDepth = React.useMemo(() => {
    if (!onchainDataByDepth) {
      return undefined;
    }

    return [
      {
        id: 'on-chain',
        name: 'On-chain share price',
        type: 'area',
        data: onchainDataByDepth.data.map((item: DepthTimelineItem) => ({
          x: new Date(item.timestamp * 1000),
          y: new BigNumber(item.calculations.price).toPrecision(8),
        })),
      },
    ] as Serie[];
  }, [onchainDataByDepth]);

  const formattedOffchainDataByDepth = React.useMemo(() => {
    if (!offchainDataByDepth) {
      return undefined;
    }

    return [
      {
        id: 'off-chain',
        name: 'Interim share price movements',
        type: 'line',
        data: offchainDataByDepth.data.map((item: DepthTimelineItem) => ({
          x: new Date(item.timestamp * 1000),
          y: new BigNumber(item.calculations.price).toPrecision(8),
        })),
      },
    ] as Serie[];
  }, [offchainDataByDepth]);

  const formattedOnchainDataByDate = React.useMemo(() => {
    if (!onchainDataByDate) {
      return undefined;
    }

    return [
      {
        id: 'on-chain',
        name: 'On-chain share price',
        type: 'area',
        data: onchainDataByDate.data.map((item: DepthTimelineItem) => ({
          x: new Date(item.timestamp * 1000),
          y: new BigNumber(item.calculations.price).toPrecision(8),
        })),
      },
    ] as Serie[];
  }, [onchainDataByDate]);

  if (onchainDataByDateFetching || onchainDataByDepthFetching) {
    return (
      <Block>
        <SectionTitle>Share Price</SectionTitle>
        <Spinner />
      </Block>
    );
  }
  if (onchainDataByDateError || onchainDataByDepthError || offchainDataByDepthError) {
    return (
      <Block>
        <SectionTitle>Share Price</SectionTitle>
        <NotificationBar kind="error">
          <NotificationContent>There was an unexpected error fetching fund data.</NotificationContent>
        </NotificationBar>
      </Block>
    );
  }
  return (
    <Block>
      <SectionTitle>Share Price</SectionTitle>
      <PriceChart
        setDepth={setDepth}
        depth={depth}
        data={formattedOnchainDataByDepth ?? formattedOnchainDataByDate ?? ([] as Serie[])}
        secondary={formattedOffchainDataByDepth}
        loading={onchainDataByDepthFetching || offchainDataByDepthFetching || onchainDataByDateFetching}
        inception={fund.creationTime!}
      />
    </Block>
  );
};
