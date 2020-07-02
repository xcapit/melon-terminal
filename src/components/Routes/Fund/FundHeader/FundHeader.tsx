import React from 'react';
import { useFundDetailsQuery } from './FundDetails.query';
import { useFundDailyChange } from '~/components/Routes/Fund/FundHeader/FundDailyChange.query';
import { RequiresFundSetupComplete } from '~/components/Gates/RequiresFundSetupComplete/RequiresFundSetupComplete';
import { DataBlock, DataBlockSection } from '~/storybook/DataBlock/DataBlock';
import { Bar, BarContent } from '~/storybook/Bar/Bar';
import { Headline } from '~/storybook/Headline/Headline';
import { FormattedNumber } from '~/components/Common/FormattedNumber/FormattedNumber';
import { TokenValueDisplay } from '~/components/Common/TokenValueDisplay/TokenValueDisplay';
import { useFundSlug } from './FundSlug.query';
import { NetworkEnum } from '~/types';
import { useEnvironment } from '~/hooks/useEnvironment';
import { CopyToClipboard } from '~/components/Common/CopyToClipboard/CopyToClipboard';
import { useTableData } from '../../Home/FundOverview/FundOverview';
import {
  GiCaesar,
  GiSpartanHelmet,
  GiPegasus,
  GiStorkDelivery,
  GiChariot,
  GiWingfoot,
  GiIcarus,
  GiMedusaHead,
  GiPalisade,
  GiPadlock,
} from 'react-icons/gi';
import { Button } from '~/components/Form/Button/Button';
import { useHistory } from 'react-router';
import { useConnectionState } from '~/hooks/useConnectionState';
import { getNetworkName } from '~/config';

export interface FundHeaderProps {
  address: string;
}

export const FundHeader: React.FC<FundHeaderProps> = ({ address }) => {
  const environment = useEnvironment()!;
  const [fund, query] = useFundDetailsQuery(address);
  const [dailyChange, queryDailyChange] = useFundDailyChange(address);
  const [slug] = useFundSlug(address);
  const allFunds = useTableData();

  const history = useHistory();
  const connection = useConnectionState();
  const prefix = getNetworkName(connection.network);

  if (queryDailyChange.loading || query.loading || !fund) {
    return null;
  }

  const fundData = allFunds.find((item) => item.address === address);

  const routes = fund.routes;
  const accounting = routes && routes.accounting;

  const slugUrl =
    slug &&
    slug + (environment.network > 1 ? `.${NetworkEnum[environment.network].toLowerCase()}.melon.fund` : '.melon.fund');

  const SlugComponent = <CopyToClipboard text={slugUrl} value={`https://${slugUrl}`} />;

  const badges = [];
  fundData?.top5AUM && badges.push(<GiCaesar color="rgb(133,213,202)" title="Top 5 fund by AUM" />);
  fundData?.top5YTD && badges.push(<GiSpartanHelmet color="rgb(133,213,202)" title="Top 5 performance YTD" />);
  fundData?.top5MTD && badges.push(<GiPegasus color="rgb(133,213,202)" title="Top 5 performance MTD" />);
  fundData?.top5Recent &&
    badges.push(<GiStorkDelivery color="rgb(133,213,202)" title="Top 5 funds with most investors" />);
  fundData?.top5Investments && badges.push(<GiChariot color="rgb(133,213,202)" title="5 funds with most investors" />);
  fundData?.largeFund && badges.push(<GiWingfoot color="rgb(133,213,202)" title="Fund managing more than 100 ETH" />);
  fundData?.underperformingFund && badges.push(<GiIcarus color="rgb(255,141,136)" title="Underperforming fund" />);
  fundData?.tinyFund && badges.push(<GiMedusaHead color="rgb(255,141,136)" title="Tiny fund" />);
  fundData?.userWhitelist && badges.push(<GiPalisade color="grey" title="Fund operates a user whitelist" />);
  fundData?.closed && badges.push(<GiPadlock color="grey" title="Fund is closed for investment" />);

  return (
    <Bar>
      <BarContent justify="between">
        <Headline title={fund.name} text={SlugComponent} icon="ETHEREUM" badges={badges} />
        <RequiresFundSetupComplete fallback={false}>
          <DataBlockSection>
            <DataBlock label="Share price">
              <TokenValueDisplay value={accounting?.sharePrice} decimals={0} symbol="WETH" />
            </DataBlock>

            <DataBlock label="Assets under management">
              <TokenValueDisplay value={accounting?.grossAssetValue} decimals={0} symbol="WETH" />
            </DataBlock>

            <DataBlock label="Daily change">
              <FormattedNumber value={dailyChange} colorize={true} decimals={2} suffix="%" />
            </DataBlock>

            <Button kind="success" size="large" onClick={() => history.push(`/${prefix}/fund/${address}/invest`)}>
              Invest
            </Button>
          </DataBlockSection>
        </RequiresFundSetupComplete>
      </BarContent>
    </Bar>
  );
};
