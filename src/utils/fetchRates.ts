export interface RatesItem {
  ETH: number;
  USD: number;
  BTC: number;
}

export interface Rates {
  [symbol: string]: RatesItem;
}

export async function fetchRates() {
  const api = `${process.env.MELON_RATES_API}/api/latest`;
  const response = await fetch(api);
  const result = (await response.json()).data;
  const rates = { ...result, WETH: result.WETH ?? result.ETH };
  return rates as Rates;
}
