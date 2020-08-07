import { BigNumber } from 'bignumber.js';
import { endOfMonth, subMonths, addMonths } from 'date-fns';
import { calculateReturn } from '~/utils/finance';
import { MonthendTimelineItem } from '~/hooks/metricsService/useFetchFundPricesByMonthEnd';

export interface DisplayData {
  label?: string;
  date: Date;
  return: BigNumber;
}

export interface MonthlyReturnData {
  maxDigits: number;
  data: {
    ETH: DisplayData[];
    EUR: DisplayData[];
    USD: DisplayData[];
    BTC: DisplayData[];
    BITWISE10?: DisplayData[];
  };
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
 * @param fxRates
 */

export function calculateHoldingPeriodReturns(
  priceData: MonthendTimelineItem[] | undefined,
  startDate: number,
  fxRates: { ethbtc: number; ethusd: number; etheur: number } | undefined
) {
  // fxAtInception and priceData are loading
  if (!fxRates || !priceData) {
    return {
      ETH: new BigNumber('NaN'),
      BTC: new BigNumber('NaN'),
      USD: new BigNumber('NaN'),
      EUR: new BigNumber('NaN'),
    };
  }

  const relevantPriceData = priceData.filter((item) => {
    return item.timestamp >= startDate;
  });

  // failsafe if somehow a young fund gets through the conditional in FundOverview
  // or if holding period started today
  if (relevantPriceData.length < 2) {
    return {
      ETH: new BigNumber('NaN'),
      BTC: new BigNumber('NaN'),
      USD: new BigNumber('NaN'),
      EUR: new BigNumber('NaN'),
    };
  }

  const periodStart = relevantPriceData[0];
  const periodEnd = relevantPriceData[relevantPriceData.length - 1];
  // .8327, .7734
  // fund is younger than the date passed if the filter does not change the length of the array
  // in that case, you calculate return using 1 for the starting price of ETH and the various exchange rates for the others
  if (priceData.length === relevantPriceData.length) {
    return {
      ETH: calculateReturn(periodEnd.calculations.price, 1),
      BTC: calculateReturn(periodEnd.references.ethbtc * periodEnd.calculations.price, fxRates.ethbtc),
      USD: calculateReturn(periodEnd.references.ethusd * periodEnd.calculations.price, fxRates.ethusd),
      EUR: calculateReturn(periodEnd.references.etheur * periodEnd.calculations.price, fxRates.etheur),
    };
  }

  const ethReturn = calculateReturn(periodEnd.calculations.price, periodStart.calculations.price);
  const btcReturn = calculateReturn(
    periodEnd.references.ethbtc * periodEnd.calculations.price,
    periodStart.references.ethbtc * periodStart.calculations.price
  );
  const usdReturn = calculateReturn(
    periodEnd.references.ethusd * periodEnd.calculations.price,
    periodStart.references.ethusd * periodStart.calculations.price
  );
  const eurReturn = calculateReturn(
    periodEnd.references.etheur * periodEnd.calculations.price,
    periodStart.references.etheur * periodStart.calculations.price
  );

  return {
    ETH: ethReturn,
    BTC: btcReturn,
    USD: usdReturn,
    EUR: eurReturn,
  };
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
  dayZeroFx: {
    ethbtc: number;
    ethusd: number;
    etheur: number;
  },
  today?: Date,
  activeMonths?: number,
  monthsBeforeFund?: number,
  monthsRemaining?: number
): MonthlyReturnData {
  let maxDigits = 0;
  const ethActiveMonthReturns: DisplayData[] = monthlyReturnData.map(
    (item: MonthendTimelineItem, index: number, arr: MonthendTimelineItem[]) => {
      const previous = index === 0 ? new BigNumber(1) : new BigNumber(arr[index - 1].calculations.price);

      const rtrn = calculateReturn(new BigNumber(item.calculations.price), previous);

      if (rtrn.toPrecision(2).toString().length > maxDigits) {
        maxDigits = rtrn.toPrecision(2).toString().length;
      }

      return {
        return: rtrn,
        date: new Date(item.timestamp * 1000),
      };
    }
  );

  const usdActiveMonthReturns: DisplayData[] = monthlyReturnData.map(
    (item: MonthendTimelineItem, index: number, arr: MonthendTimelineItem[]) => {
      const previous =
        index === 0
          ? new BigNumber(dayZeroFx.ethusd)
          : new BigNumber(arr[index - 1].calculations.price * arr[index - 1].references.ethusd);

      const rtrn = calculateReturn(new BigNumber(item.calculations.price * item.references.ethusd), previous);

      if (rtrn.toPrecision(2).toString().length > maxDigits) {
        maxDigits = rtrn.toPrecision(2).toString().length;
      }

      return {
        return: rtrn,
        date: new Date(item.timestamp * 1000),
      };
    }
  );

  const eurActiveMonthReturns: DisplayData[] = monthlyReturnData.map(
    (item: MonthendTimelineItem, index: number, arr: MonthendTimelineItem[]) => {
      const previous =
        index === 0
          ? new BigNumber(dayZeroFx.etheur)
          : new BigNumber(arr[index - 1].calculations.price * arr[index - 1].references.etheur);
      const rtrn = calculateReturn(new BigNumber(item.calculations.price * item.references.etheur), previous);

      if (rtrn.toPrecision(2).toString().length > maxDigits) {
        maxDigits = rtrn.toPrecision(2).toString().length;
      }

      return {
        return: rtrn,
        date: new Date(item.timestamp * 1000),
      };
    }
  );

  const btcActiveMonthReturns: DisplayData[] = monthlyReturnData.map(
    (item: MonthendTimelineItem, index: number, arr: MonthendTimelineItem[]) => {
      const previous =
        index === 0
          ? new BigNumber(dayZeroFx.ethbtc)
          : new BigNumber(arr[index - 1].calculations.price * arr[index - 1].references.ethbtc);

      const rtrn = calculateReturn(new BigNumber(item.calculations.price * item.references.ethbtc), previous);

      if (rtrn.toPrecision(2).toString().length > maxDigits) {
        maxDigits = rtrn.toPrecision(2).toString().length;
      }

      return {
        return: rtrn,
        date: new Date(item.timestamp * 1000),
      };
    }
  );

  const inactiveMonthReturns: DisplayData[] | undefined =
    today && monthsBeforeFund && activeMonths
      ? new Array(monthsBeforeFund)
          .fill(null)
          .map((item, index: number) => {
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

  const aggregatedMonthlyReturns = {
    ETH:
      inactiveMonthReturns && monthsRemainingInYear
        ? inactiveMonthReturns.concat(ethActiveMonthReturns).concat(monthsRemainingInYear)
        : ethActiveMonthReturns,
    USD:
      inactiveMonthReturns && monthsRemainingInYear
        ? inactiveMonthReturns.concat(usdActiveMonthReturns).concat(monthsRemainingInYear)
        : usdActiveMonthReturns,
    EUR:
      inactiveMonthReturns && monthsRemainingInYear
        ? inactiveMonthReturns.concat(eurActiveMonthReturns).concat(monthsRemainingInYear)
        : eurActiveMonthReturns,
    BTC:
      inactiveMonthReturns && monthsRemainingInYear
        ? inactiveMonthReturns.concat(btcActiveMonthReturns).concat(monthsRemainingInYear)
        : btcActiveMonthReturns,
  };

  return { maxDigits: maxDigits, data: aggregatedMonthlyReturns };
}
