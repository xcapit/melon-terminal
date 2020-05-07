import { AssetBlacklist, AssetWhitelist, Holding, MaxPositions, Policy, Token } from '@melonproject/melongql';
import {
  DeployedEnvironment,
  ExchangeDefinition,
  ExchangeIdentifier,
  sameAddress,
  TokenDefinition,
} from '@melonproject/melonjs';
import BigNumber from 'bignumber.js';
import React from 'react';
import * as Yup from 'yup';
import { Form, useFormik, Wrapper } from '~/components/Form/Form';
import { TokenValue } from '~/components/Form/TokenValueSelect/TokenValue';
import { TokenValueSelect } from '~/components/Form/TokenValueSelect/TokenValueSelect';
import { useEnvironment } from '~/hooks/useEnvironment';
import { Block } from '~/storybook/Block/Block';
import { Grid, GridCol, GridRow } from '~/storybook/Grid/Grid';
import { Link } from '~/storybook/Link/Link';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';
import { SectionTitle } from '~/storybook/Title/Title';
import { FundKyberTrading } from '../FundKyberTrading/FundKyberTrading';
import { FundMelonEngineTrading } from '../FundMelonEngineTrading/FundMelonEngineTrading';
import { FundUniswapTrading } from '../FundUniswapTrading/FundUniswapTrading';

export interface FundLiquidityProviderTradingProps {
  trading: string;
  denominationAsset?: Token;
  exchanges: ExchangeDefinition[];
  holdings: Holding[];
  policies?: Policy[];
}

export const FundLiquidityProviderTrading: React.FC<FundLiquidityProviderTradingProps> = (props) => {
  const environment = useEnvironment()!;

  const assetWhitelists = props.policies?.filter((policy) => policy.identifier === 'AssetWhitelist') as
    | AssetWhitelist[]
    | undefined;
  const assetBlacklists = props.policies?.filter((policy) => policy.identifier === 'AssetBlacklist') as
    | AssetBlacklist[]
    | undefined;
  const maxPositionsPolicies = props.policies?.filter((policy) => policy.identifier === 'MaxPositions') as
    | MaxPositions[]
    | undefined;

  const nonZeroHoldings = props.holdings.filter((holding) => !holding.amount?.isZero());

  const takerOptions = environment.tokens.filter((item) => !item.historic).map((token) => token);

  const makerOptions = environment.tokens
    .filter((item) => !item.historic)
    .filter(
      (asset) =>
        sameAddress(asset.address, props.denominationAsset?.address) ||
        !assetWhitelists?.length ||
        assetWhitelists.every((list) => list.assetWhitelist?.some((item) => sameAddress(item, asset.address)))
    )
    .filter(
      (asset) =>
        sameAddress(asset.address, props.denominationAsset?.address) ||
        !assetBlacklists?.length ||
        !assetBlacklists.some((list) => list.assetBlacklist?.some((item) => sameAddress(item, asset.address)))
    );

  if (takerOptions?.length < 2) {
    return (
      <Block>
        <SectionTitle>Liquidity Pool Trading</SectionTitle>
        <p>
          Liquidity pool trading is not possible because the fund's risk management policies prevent the investment in
          any asset.
        </p>
      </Block>
    );
  }

  const uniswapLegacyWarning =
    props.exchanges.includes(environment.getExchange('0x3fda51d218919b96a850e7b66d412a4604e4901d')) &&
    !props.exchanges.includes(environment.getExchange(ExchangeIdentifier.Uniswap));

  return (
    <Block>
      <SectionTitle>Liquidity Pool Trading</SectionTitle>

      {uniswapLegacyWarning && (
        <NotificationBar kind="error">
          <NotificationContent>
            We have deployed a bug fix for the Uniswap adapter. To continue trading on Uniswap, you have to{' '}
            <Link to={`manage`}>register</Link> the new adapter in the <Link to={`manage`}>admin section</Link> of your
            fund.
          </NotificationContent>
        </NotificationBar>
      )}

      <FundLiquidityProviderTradingForm
        takerOptions={takerOptions}
        makerOptions={makerOptions}
        environment={environment}
        maxPositionsPolicies={maxPositionsPolicies}
        nonZeroHoldings={nonZeroHoldings}
        {...props}
      />
    </Block>
  );
};

const validationSchema = Yup.object().shape({
  makerAsset: Yup.mixed()
    .required()
    .test('maxPositions', 'Investing with this asset would violate the maximum number of positions policy', function ({
      token,
    }) {
      const maxPositionsPolicies = (this.options.context as any).maxPositionsPolicies as MaxPositions[] | undefined;
      const denominationAsset = (this.options.context as any).denominationAsset;
      const nonZeroHoldings = (this.options.context as any).nonZeroHoldings as Holding[];

      return (
        // no policies
        !maxPositionsPolicies?.length ||
        // new investment is in denomination asset
        sameAddress(denominationAsset?.address, token) ||
        // already existing token
        !!nonZeroHoldings?.some((holding) => sameAddress(holding.token?.address, token)) ||
        // max positions larger than holdings (so new token would still fit)
        maxPositionsPolicies.every(
          (policy) => policy.maxPositions && nonZeroHoldings && policy.maxPositions > nonZeroHoldings?.length
        )
      );
    }) as Yup.Schema<TokenValue>,
  takerAsset: Yup.mixed()
    .required('Missing sell quantity.')
    // tslint:disable-next-line
    .test('valid-number', 'The given value is not a valid number.', function ({ value }) {
      return !value.isNaN() && !value.isZero() && value.isPositive();
    })
    // tslint:disable-next-line
    .test('balance-too-low', 'Your balance of the token is lower than the provided value.', function (value) {
      const holdings = (this.options.context as any).holdings as Holding[];
      const holding = holdings.find((item) => sameAddress(item.token!.address, value.token.address))!;
      const divisor = holding ? new BigNumber(10).exponentiatedBy(holding.token!.decimals!) : new BigNumber('NaN');
      const balance = holding ? holding.amount!.dividedBy(divisor) : new BigNumber('NaN');
      return new BigNumber(value.value).isLessThanOrEqualTo(balance);
    }) as Yup.Schema<TokenValue>,
});

interface FundLiquidityProviderTradingFormProps extends FundLiquidityProviderTradingProps {
  takerOptions: TokenDefinition[];
  makerOptions: TokenDefinition[];
  environment: DeployedEnvironment;
  maxPositionsPolicies: MaxPositions[] | undefined;
  nonZeroHoldings: Holding[];
}

const FundLiquidityProviderTradingForm: React.FC<FundLiquidityProviderTradingFormProps> = ({
  takerOptions,
  makerOptions,
  environment,
  maxPositionsPolicies,
  denominationAsset,
  nonZeroHoldings,
  holdings,
  ...props
}) => {
  const validationContext = React.useMemo(
    () => ({ maxPositionsPolicies, denominationAsset, nonZeroHoldings, holdings }),
    [maxPositionsPolicies, denominationAsset, nonZeroHoldings, holdings]
  );

  const initialValues = {
    takerAsset: new TokenValue(takerOptions[0], 1),
    makerAsset: new TokenValue(makerOptions[1]),
  };

  const formik = useFormik({
    validationSchema,
    validationContext,
    initialValues,
    onSubmit: () => {},
  });

  const mln = environment.getToken('MLN');
  const weth = environment.getToken('WETH');

  const exchanges = props.exchanges
    .map((exchange) => {
      if (exchange.id === ExchangeIdentifier.KyberNetwork) {
        return [exchange, FundKyberTrading];
      }

      if (exchange.id === ExchangeIdentifier.Uniswap) {
        return [exchange, FundUniswapTrading];
      }

      if (exchange.id === ExchangeIdentifier.MelonEngine) {
        if (formik.values.makerAsset === weth && formik.values.takerAsset === mln) {
          return [exchange, FundMelonEngineTrading];
        }

        return null;
      }

      return null;
    })
    .filter((value) => !!value) as [ExchangeDefinition, React.ElementType][];

  return (
    <Form formik={formik}>
      <Grid>
        <GridRow>
          <GridCol md={6}>
            <SectionTitle>Choose the assets to swap</SectionTitle>
            <TokenValueSelect name="takerAsset" label="Sell" tokens={takerOptions} />
            <TokenValueSelect name="makerAsset" label="To buy" tokens={makerOptions} disabled={true} placeholder="  " />
          </GridCol>

          <GridCol md={6} xs={12}>
            <SectionTitle>Choose your pool and swap</SectionTitle>
            {!!(exchanges && exchanges.length) &&
              exchanges.map(([exchange, Component]) => (
                <GridRow key={exchange.id}>
                  <GridCol>
                    <Wrapper>
                      <Component
                        active={formik.isValid}
                        trading={props.trading}
                        holdings={holdings}
                        denominationAsset={denominationAsset}
                        policies={props.policies}
                        exchange={exchange}
                        maker={formik.values.makerAsset.token}
                        taker={formik.values.takerAsset.token}
                        quantity={formik.values.takerAsset.value}
                      />
                    </Wrapper>
                  </GridCol>
                </GridRow>
              ))}
          </GridCol>
        </GridRow>
      </Grid>
    </Form>
  );
};
