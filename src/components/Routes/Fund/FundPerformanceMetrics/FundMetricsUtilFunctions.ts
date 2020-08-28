import { BigNumber } from 'bignumber.js';
import { endOfMonth, subMonths, addMonths, addMinutes } from 'date-fns';
import { calculateReturn } from '~/utils/finance';
import { MonthendTimelineItem } from '~/hooks/metricsService/useFetchFundPricesByMonthEnd';
import { getRate } from '~/components/Contexts/Currency/Currency';

export interface DisplayData {
  label?: string;
  date: Date;
  return: BigNumber;
}

export interface MonthlyReturnData {
  data: DisplayData[];
}

/**
 * Pass this function an array of MonthendTimelineItems, a start date,
 * and an object with the fx rates from the day of the fund's creation.
 * It will calculate the return of the fund in ETH, BTC, USD, and EUR
 * from that start date until today. Use it in a useMemo hook with the
 * results of a useQuery call to the metrics service. It also need
 *
 * @param priceData potentially undefined while query is fetching
 * @param startDate
 */

export function calculateHoldingPeriodReturns(
  priceData: MonthendTimelineItem[] | undefined,
  startDate: number,
  currency: string
): BigNumber {
  // fxAtInception and priceData are loading
  if (!priceData) {
    return new BigNumber('NaN');
  }

  const relevantPriceData = priceData.filter((item) => {
    return item.timestamp >= startDate;
  });

  // failsafe if somehow a young fund gets through the conditional in FundOverview
  // or if holding period started today
  if (relevantPriceData.length < 2) {
    return new BigNumber('NaN');
  }

  const periodStart = relevantPriceData[0];
  const periodEnd = relevantPriceData[relevantPriceData.length - 1];

  return calculateReturn(
    new BigNumber(periodEnd.calculations.gav > 0 ? periodEnd.calculations.price : NaN).dividedBy(
      getRate(periodEnd.rates, currency)
    ),
    new BigNumber(periodStart.calculations.price === 0 ? 1 : periodStart.calculations.price).dividedBy(
      getRate(periodStart.rates, currency)
    )
  );
}

/**
 * Takes an array of MonthEndTimeLineItems (data from the last day of each month, in sequence) and returns an array of
 * month on month returns as BigNumbers. The first item in the returned array will be a return calculated as such:
 * ETH: historical price: 1, most recent price: inputData[0].calculations.shareprice
 * BTC/USD/EUR: historical price: ETH/currency cross rate on day of fund inception (1ETH worth X currency),
 * most recent price: inputData[0].ethccy * inputData[0].calculations.shareprice
 * All subsequent returns are calculated as historical: inputData[index-1], current: inputData[index]
 *
 * @param monthlyReturnData the data returned from a monthend call to our metrics service
 * @param dayZeroFx an object with the ethusd, etheur, and ethbtc VWAP prices from the day of the fund's inception
 * optional params: for generating the empty padding arrays to display in a table
 * @param today Today as a date.
 * @param activeMonths The total number of months a fund has been active
 * @param monthsBeforeFund The months before the fund was created in the year the fund was created,
 * @param monthsRemaining The months remaining in the current year
 */

export function monthlyReturnsFromTimeline(
  monthlyReturnData: MonthendTimelineItem[] = [],
  currency: string,
  today?: Date,
  activeMonths?: number,
  monthsBeforeFund?: number,
  monthsRemaining?: number
): MonthlyReturnData {
  const activeMonthReturns: DisplayData[] = monthlyReturnData.map(
    (item: MonthendTimelineItem, index: number, arr: MonthendTimelineItem[]) => {
      const rtrn = new BigNumber(item.returns[currency]);

      const rawDate = new Date(item.timestamp * 1000);
      const date = addMinutes(rawDate, rawDate.getTimezoneOffset());

      return {
        return: rtrn,
        date,
      };
    }
  );

  // in general, the first item should be removed
  // When fund was started on the last day of the month, however, we keep that first item
  if (activeMonthReturns.length > 1) {
    if (activeMonthReturns[0].date.getMonth() === activeMonthReturns[1].date.getMonth()) {
      activeMonthReturns.shift();
    }
  }

  const inactiveMonthReturns: DisplayData[] | undefined =
    today && monthsBeforeFund && activeMonths
      ? new Array(monthsBeforeFund)
          .fill(null)
          .map((_, index: number) => {
            return {
              date: endOfMonth(subMonths(today, index + activeMonths)),
              return: new BigNumber('NaN'),
            } as DisplayData;
          })
          .reverse()
      : undefined;

  const monthsRemainingInYear: DisplayData[] | undefined =
    today && monthsRemaining
      ? new Array(monthsRemaining).fill(null).map((item, index: number) => {
          return { date: endOfMonth(addMonths(today, index + 1)), return: new BigNumber('NaN') } as DisplayData;
        })
      : undefined;

  const aggregatedMonthlyReturns =
    inactiveMonthReturns && monthsRemainingInYear
      ? inactiveMonthReturns.concat(activeMonthReturns).concat(monthsRemainingInYear)
      : activeMonthReturns;

  return { data: aggregatedMonthlyReturns };
}
