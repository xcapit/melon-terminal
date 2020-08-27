import { useQuery } from 'react-query';

export interface MonthendTimelineItem {
  timestamp: number;
  rates: {
    [symbol: string]: number;
  };
  holdings: {
    [symbol: string]: number;
  };
  shares: number;
  calculations: {
    price: number;
    gav: number;
    nav: number;
  };
  purchase: boolean;
  redemption: boolean;
  monthEnd: boolean;
  returns: {
    ETH: number;
    BTC: number;
    USD: number;
    date: number;
  };
}

async function fetchFundPricesByMonthEnd(key: string, address: string) {
  const url = process.env.MELON_METRICS_API;
  const queryAddress = `${url}/api/monthend?address=${address}`;
  const response = await fetch(queryAddress).then((response) => response.json());

  return response;
}

export function useFetchFundPricesByMonthEnd(fund: string) {
  const address = fund.toLowerCase();
  const key = 'monthlyPrice';
  return useQuery([key, address], fetchFundPricesByMonthEnd, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
  });
}
