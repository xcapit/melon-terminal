import * as React from 'react';
import BigNumber from 'bignumber.js';
import { startOfYear, startOfMonth, startOfQuarter, differenceInCalendarDays, isSameDay } from 'date-fns';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import { useFund } from '~/hooks/useFund';
import { useFetchFundPricesByMonthEnd } from '~/hooks/metricsService/useFetchFundPricesByMonthEnd';
import { useFetchFundPricesByRange, RangeTimelineItem } from '~/hooks/metricsService/useFetchFundPricesByRange';
import { useFetchReferencePricesByDate } from '~/hooks/metricsService/useFetchReferencePricesByDate';
import { monthlyReturnsFromTimeline, DisplayData, calculateHoldingPeriodReturns } from './FundMetricsUtilFunctions';
import { SelectField } from '~/components/Form/Select/Select';
import { DictionaryEntry, DictionaryLabel, DictionaryData } from '~/storybook/Dictionary/Dictionary';
import { SectionTitle } from '~/storybook/Title/Title.styles';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';
import { Tooltip } from '~/storybook/Tooltip/Tooltip';
import { Block } from '~/storybook/Block/Block';
import { Spinner } from '~/storybook/Spinner/Spinner';
import { Title } from '~/storybook/Title/Title';
import { findCorrectFromTime, findCorrectToTime } from '~/utils/priceServiceDates';
import { average, calculateVolatility } from '~/utils/finance';
import styled from 'styled-components';

export interface FundSharePriceMetricsProps {
  address: string;
}

interface HoldingPeriodReturns {
  ETH: BigNumber[];
  USD: BigNumber[];
  EUR: BigNumber[];
  BTC: BigNumber[];
}

interface SelectItem {
  label: keyof HoldingPeriodReturns;
  value: keyof HoldingPeriodReturns;
}

const CurrencySelect = styled.div`
  min-width: 100px;
  float: left;
  margin-bottom: 5px;
`;

const TitleContainerWithSelect = styled.div`
  border-bottom: ${(props) => props.theme.border.borderSecondary};
  margin-bottom: ${(props) => props.theme.spaceUnits.m};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const BlockWithSelect = styled(Block)`
  padding-top: ${(props) => props.theme.spaceUnits.xs};
`;

const comparisonCurrencies: SelectItem[] = [
  { label: 'ETH', value: 'ETH' },
  { label: 'BTC', value: 'BTC' },
  { label: 'EUR', value: 'EUR' },
  { label: 'USD', value: 'USD' },
];

function findLastQuarter(utcMonth: number): number {
  let month = 0;
  for (let i = utcMonth; i >= 0; i--) {
    if (i % 3 === 0) {
      month = i;
      break;
    }
  }
  return month;
}

export const FundSharePriceMetrics: React.FC<FundSharePriceMetricsProps> = (props) => {
  const today = React.useMemo(() => new Date(), []);

  const fund = useFund();

  const [selectedCurrency, setSelectedCurrency] = React.useState<SelectItem>(comparisonCurrencies[0]);

  const fundInceptionDate = findCorrectFromTime(fund.creationTime!);

  const {
    data: historicalData,
    error: historicalDataError,
    isFetching: historicalDataFetching,
  } = useFetchFundPricesByRange(fund.address!, fundInceptionDate);

  const { data: monthlyData, error: monthlyError, isFetching: monthlyFetching } = useFetchFundPricesByMonthEnd(
    fund.address!
  );

  const {
    data: fxAtInception,
    error: fxAtInceptionError,
    isFetching: fxAtInceptionFetching,
  } = useFetchReferencePricesByDate(fund.creationTime!);

  const monthlyReturns = React.useMemo(() => {
    return monthlyData?.data && fxAtInception && monthlyReturnsFromTimeline(monthlyData.data, fxAtInception);
  }, [monthlyData?.data, fxAtInception]);

  const utcYear = today.getUTCFullYear();
  const utcMonth = today.getUTCMonth();
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const lastMonthendDate: number = (Date.UTC(utcYear, utcMonth) - dayInMilliseconds) / 1000;
  const lastQuarterendDate: number = (Date.UTC(utcYear, findLastQuarter(utcMonth)) - dayInMilliseconds) / 1000;
  const lastYearendDate: number = (Date.UTC(utcYear, 0) - dayInMilliseconds) / 1000;

  const mtdReturn = React.useMemo(() => {
    return calculateHoldingPeriodReturns(monthlyData?.data, lastMonthendDate, fxAtInception);
  }, [monthlyData, fxAtInception]);

  const qtdReturn = React.useMemo(() => {
    return calculateHoldingPeriodReturns(monthlyData?.data, lastQuarterendDate, fxAtInception);
  }, [monthlyData, fxAtInception]);

  const ytdReturn = React.useMemo(() => {
    return calculateHoldingPeriodReturns(monthlyData?.data, lastYearendDate, fxAtInception);
  }, [monthlyData, fxAtInception]);

  const bestMonth = React.useMemo(() => {
    return monthlyReturns?.data[selectedCurrency.value].reduce((carry: DisplayData, current: DisplayData) => {
      if (current.return.isGreaterThan(carry.return)) {
        return current;
      }
      return carry;
    }, monthlyReturns.data[selectedCurrency.value][0]);
  }, [monthlyReturns, selectedCurrency]);

  const worstMonth = React.useMemo(() => {
    return monthlyReturns?.data[selectedCurrency.value].reduce((carry: DisplayData, current: DisplayData) => {
      if (current.return.isLessThan(carry.return)) {
        return current;
      }
      return carry;
    }, monthlyReturns.data[selectedCurrency.value][0]);
  }, [monthlyReturns, selectedCurrency]);

  const monthlyWinLoss = React.useMemo(() => {
    return (
      monthlyReturns?.data[selectedCurrency.value].reduce(
        (carry: { win: number; lose: number }, current: DisplayData) => {
          if (current.return.isGreaterThanOrEqualTo(0)) {
            carry.win++;
            return carry;
          }
          carry.lose++;
          return carry;
        },
        { win: 0, lose: 0 }
      ) || { win: 0, lose: 0 }
    );
  }, [monthlyReturns, selectedCurrency]);

  const averageMonthlyReturn = React.useMemo(() => {
    return monthlyReturns && average(monthlyReturns.data[selectedCurrency.value].map((month) => month.return));
  }, [monthlyReturns, selectedCurrency]);

  const volSampleTime =
    differenceInCalendarDays(today, fund.creationTime!) > 20 ? 20 : differenceInCalendarDays(today, fund.creationTime!);

  const sampleVol = React.useMemo(() => {
    return (
      historicalData &&
      volSampleTime &&
      calculateVolatility(
        historicalData.data
          .slice(volSampleTime, historicalData.data.length - 1)
          .map((item: RangeTimelineItem) => new BigNumber(item.calculations.price))
      )
    );
  }, [volSampleTime, historicalData]);

  function toggleCurrencySelection(value: keyof HoldingPeriodReturns) {
    if (!value) {
      return;
    }
    const newCurrency = comparisonCurrencies.filter((item) => item.value == value)[0];
    setSelectedCurrency(newCurrency);
  }

  if (historicalDataError || monthlyError || monthlyData?.errors?.length || fxAtInceptionError) {
    return (
      <Block>
        <SectionTitle>Share Price Metrics</SectionTitle>
        <NotificationBar kind="error">
          <NotificationContent>There was an unexpected error fetching fund data.</NotificationContent>
        </NotificationBar>
      </Block>
    );
  }

  if (
    !historicalData ||
    historicalDataFetching ||
    !monthlyData ||
    monthlyFetching ||
    !fxAtInception ||
    fxAtInceptionFetching
  ) {
    return (
      <Block>
        <SectionTitle>Share Price Metrics</SectionTitle>
        <Spinner />
      </Block>
    );
  }

  return (
    <BlockWithSelect>
      <TitleContainerWithSelect>
        <Title>Share Price Metrics</Title>{' '}
        <CurrencySelect>
          <SelectField
            name="Comparison Currency"
            defaultValue={selectedCurrency}
            options={comparisonCurrencies}
            onChange={(value) => value && toggleCurrencySelection((value as any).value)}
          />
        </CurrencySelect>
      </TitleContainerWithSelect>

      <DictionaryEntry>
        <DictionaryLabel>MTD</DictionaryLabel>
        {isSameDay(today, startOfMonth(today)) ? (
          <DictionaryData> - </DictionaryData>
        ) : (
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={mtdReturn[selectedCurrency.label]} suffix={'%'} />
          </DictionaryData>
        )}
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>QTD</DictionaryLabel>
        {isSameDay(today, startOfQuarter(today)) ? (
          <DictionaryData> - </DictionaryData>
        ) : (
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={qtdReturn[selectedCurrency.label]} suffix={'%'} />
          </DictionaryData>
        )}
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>YTD</DictionaryLabel>
        {isSameDay(today, startOfYear(today)) ? (
          <DictionaryData> - </DictionaryData>
        ) : (
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={ytdReturn[selectedCurrency.label]} suffix={'%'} />
          </DictionaryData>
        )}
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Best Month</DictionaryLabel>
        <DictionaryData textAlign={'right'}>
          <FormattedNumber decimals={2} value={bestMonth?.return} suffix={'%'} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Worst Month</DictionaryLabel>
        <DictionaryData textAlign={'right'}>
          <FormattedNumber decimals={2} value={worstMonth?.return} suffix={'%'} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Average Month</DictionaryLabel>
        <DictionaryData textAlign={'right'}>
          <FormattedNumber decimals={2} value={averageMonthlyReturn} suffix={'%'} />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Positive Months</DictionaryLabel>
        <DictionaryData textAlign={'right'}>
          <FormattedNumber
            value={(monthlyWinLoss.win / (monthlyWinLoss.win + monthlyWinLoss.lose)) * 100}
            suffix={'%'}
            decimals={2}
          />
        </DictionaryData>
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>Track Record</DictionaryLabel>
        <DictionaryData textAlign={'right'}>
          <FormattedNumber value={monthlyWinLoss.win + monthlyWinLoss.lose} decimals={0} /> months
        </DictionaryData>
      </DictionaryEntry>
      {selectedCurrency.label === 'ETH' ? (
        <Tooltip placement="auto" value={`${volSampleTime}-day volatility of fund share price in ETH`}>
          <DictionaryEntry>
            <DictionaryLabel>Volatility</DictionaryLabel>
            <DictionaryData textAlign={'right'}>
              <FormattedNumber decimals={2} value={sampleVol} suffix={'%'} />
            </DictionaryData>
          </DictionaryEntry>
        </Tooltip>
      ) : null}
    </BlockWithSelect>
  );
};
