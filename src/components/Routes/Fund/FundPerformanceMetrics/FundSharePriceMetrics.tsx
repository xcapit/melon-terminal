import * as React from 'react';
import BigNumber from 'bignumber.js';
import {
  startOfYear,
  startOfMonth,
  startOfQuarter,
  isBefore,
  subDays,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  isSameDay,
} from 'date-fns';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import { useFund } from '~/hooks/useFund';
import { useFetchFundPricesByMonthEnd } from '~/hooks/metricsService/useFetchFundPricesByMonthEnd';
import { useFetchFundPricesByRange, RangeTimelineItem } from '~/hooks/metricsService/useFetchFundPricesByRange';
import { useFetchReferencePricesByDate } from '~/hooks/metricsService/useFetchReferencePricesByDate';
import { monthlyReturnsFromTimeline, DisplayData } from './FundMetricsUtilFunctions';
import { SelectField } from '~/components/Form/Select/Select';
import { DictionaryEntry, DictionaryLabel, DictionaryData } from '~/storybook/Dictionary/Dictionary';
import { SectionTitle } from '~/storybook/Title/Title.styles';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';
import { Tooltip } from '~/storybook/Tooltip/Tooltip';
import { Block } from '~/storybook/Block/Block';
import { Spinner } from '~/storybook/Spinner/Spinner';
import { Title } from '~/storybook/Title/Title';
import { findCorrectFromTime, findCorrectToTime } from '~/utils/priceServiceDates';
import { calculateReturn, average, calculateVolatility } from '~/utils/finance';
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

export const FundSharePriceMetrics: React.FC<FundSharePriceMetricsProps> = (props) => {
  const today = React.useMemo(() => new Date(), []);
  const fund = useFund();

  const [selectedCurrency, setSelectedCurrency] = React.useState<SelectItem>(comparisonCurrencies[0]);

  const fundInceptionDate = findCorrectFromTime(fund.creationTime!);

  const toToday = findCorrectToTime(today);

  const {
    data: historicalData,
    error: historicalDataError,
    isFetching: historicalDataFetching,
  } = useFetchFundPricesByRange(fund.address!, fundInceptionDate, toToday);

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

  const lastQuarterEndDate = subDays(startOfQuarter(today), 1);
  const diffInMonthsQuarter = differenceInCalendarMonths(today, lastQuarterEndDate);
  const quarterToDateIndex = isBefore(fundInceptionDate, lastQuarterEndDate)
    ? monthlyData?.data && monthlyData.data.length - diffInMonthsQuarter - 1
    : 0;

  const lastYearEndDate = subDays(startOfYear(today), 1);
  const diffInMonthsYear = differenceInCalendarMonths(today, lastYearEndDate);
  const yearToDateIndex = isBefore(fundInceptionDate, lastYearEndDate)
    ? 0
    : monthlyData?.data && monthlyData.length - diffInMonthsYear - 1;

  const sharePriceByDate = React.useMemo(() => {
    return {
      mostRecent: {
        ETH: monthlyData?.data && monthlyData.data[monthlyData.data.length - 1]?.calculations.price,
        USD:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 1]?.references.ethusd *
            monthlyData.data[monthlyData.data.length - 1]?.calculations.price,
        EUR:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 1]?.references.etheur *
            monthlyData.data[monthlyData.data.length - 1]?.calculations.price,
        BTC:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 1]?.references.ethbtc *
            monthlyData.data[monthlyData.data.length - 1]?.calculations.price,
      },
      monthStart: {
        ETH: monthlyData?.data && monthlyData.data[monthlyData.data.length - 2]?.calculations.price,
        USD:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 2]?.references.ethusd *
            monthlyData.data[monthlyData.data.length - 2]?.calculations.price,
        EUR:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 2]?.references.etheur *
            monthlyData.data[monthlyData.data.length - 2]?.calculations.price,
        BTC:
          monthlyData?.data &&
          monthlyData.data[monthlyData.data.length - 2]?.references.ethbtc *
            monthlyData.data[monthlyData.data.length - 2]?.calculations.price,
      },
      quarterStart: {
        ETH:
          monthlyData?.data && quarterToDateIndex !== 0 ? monthlyData.data[quarterToDateIndex]?.calculations.price : 1,
        USD:
          monthlyData?.data && quarterToDateIndex !== 0
            ? monthlyData.data[quarterToDateIndex]?.references.ethusd *
              monthlyData.data[quarterToDateIndex]?.calculations.price
            : fxAtInception?.ethusd,
        EUR:
          monthlyData?.data && quarterToDateIndex !== 0
            ? monthlyData.data[quarterToDateIndex]?.references.etheur *
              monthlyData.data[quarterToDateIndex]?.calculations.price
            : fxAtInception?.etheur,
        BTC:
          monthlyData?.data && quarterToDateIndex !== 0
            ? monthlyData.data[quarterToDateIndex]?.references.ethbtc *
              monthlyData.data[quarterToDateIndex]?.calculations.price
            : fxAtInception?.ethbtc,
      },
      yearStart: {
        ETH: monthlyData?.data && yearToDateIndex !== 0 ? monthlyData.data[yearToDateIndex]?.calculations.price : 1,
        USD:
          monthlyData?.data && yearToDateIndex !== 0
            ? monthlyData.data[yearToDateIndex].references.ethbtc *
              monthlyData.data[yearToDateIndex]?.calculations.price
            : fxAtInception?.ethusd,
        EUR:
          monthlyData?.data && yearToDateIndex !== 0
            ? monthlyData.data[yearToDateIndex].references.ethbtc *
              monthlyData.data[yearToDateIndex]?.calculations.price
            : fxAtInception?.etheur,
        BTC:
          monthlyData?.data && yearToDateIndex !== 0
            ? monthlyData.data[yearToDateIndex].references.ethbtc *
              monthlyData.data[yearToDateIndex]?.calculations.price
            : fxAtInception?.ethbtc,
      },
    };
  }, [monthlyData, fxAtInception]);

  const mostRecentPrice = sharePriceByDate.mostRecent[selectedCurrency.value];
  const quarterStartPrice = sharePriceByDate.quarterStart[selectedCurrency.value];
  const monthStartPrice = sharePriceByDate.monthStart[selectedCurrency.value];
  const yearStartPrice = sharePriceByDate.yearStart[selectedCurrency.value];

  const qtdReturn = mostRecentPrice && quarterStartPrice && calculateReturn(mostRecentPrice, quarterStartPrice);
  const mtdReturn = mostRecentPrice && monthStartPrice && calculateReturn(mostRecentPrice, monthStartPrice);
  const ytdReturn = mostRecentPrice && yearStartPrice && calculateReturn(mostRecentPrice, yearStartPrice);

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

  if (fund.creationTime && differenceInCalendarDays(today, fund.creationTime) < 31) {
    return (
      <Block>
        <SectionTitle>Share Price Metrics</SectionTitle>
        <NotificationBar kind="neutral">
          <NotificationContent>Statistics are not available for funds younger than one month.</NotificationContent>
        </NotificationBar>
      </Block>
    );
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
            <FormattedNumber decimals={2} value={mtdReturn} suffix={'%'} />
          </DictionaryData>
        )}
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>QTD</DictionaryLabel>
        {isSameDay(today, startOfQuarter(today)) ? (
          <DictionaryData> - </DictionaryData>
        ) : (
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={qtdReturn} suffix={'%'} />
          </DictionaryData>
        )}
      </DictionaryEntry>
      <DictionaryEntry>
        <DictionaryLabel>YTD</DictionaryLabel>
        {isSameDay(today, startOfYear(today)) ? (
          <DictionaryData> - </DictionaryData>
        ) : (
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={ytdReturn} suffix={'%'} />
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
      <Tooltip placement="auto" value={`${volSampleTime}-day volatility of fund share price in ETH`}>
        <DictionaryEntry>
          <DictionaryLabel>Volatility</DictionaryLabel>
          <DictionaryData textAlign={'right'}>
            <FormattedNumber decimals={2} value={sampleVol} suffix={'%'} />
          </DictionaryData>
        </DictionaryEntry>
      </Tooltip>
    </BlockWithSelect>
  );
};
