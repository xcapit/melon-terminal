import React from 'react';
import { FundHoldings } from '../FundHoldings/FundHoldings';
import { NewFundPerformanceChart } from '../FundPerformanceChart/FundPerformanceChart';
import { Grid, GridRow, GridCol } from '~/storybook/Grid/Grid';
import { FundDiligence } from '../FundDiligence/FundDiligence';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';
import { FundSharePriceMetrics } from '../FundPerformanceMetrics/FundSharePriceMetrics';
import { FundMonthlyReturnTable } from '../FundPerformanceMetrics/FundMonthlyReturnTable';
import { useFund } from '~/hooks/useFund';
import { differenceInCalendarDays, differenceInCalendarMonths } from 'date-fns';
import { Block } from '~/storybook/Block/Block';
import { SectionTitle } from '~/storybook/Title/Title';

export interface FundOverviewProps {
  address: string;
}

export const FundOverview: React.FC<FundOverviewProps> = ({ address }) => {
  const fund = useFund();
  const today = React.useMemo(() => new Date(), []);

  const showMetrics = React.useMemo(() => {
    if (!fund.creationTime) {
      return false;
    }
    const diffMonths = differenceInCalendarMonths(today, fund.creationTime);
    const diffDays = differenceInCalendarDays(today, fund.creationTime);
    return diffMonths > 1 && diffDays > 7;
  }, [fund.creationTime]);

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

  return (
    // if fund > 1 mo, split first column with fund metrics
    // else share price chart get full column (no metrics) and no monthly returns and notification content

    <Grid>
      <GridRow>
        <GridCol>
          <NewFundPerformanceChart address={address} />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <NotificationBar kind="neutral">
            <NotificationContent>
              The metrics component is currently under maintenance and will be back soon.
            </NotificationContent>
          </NotificationBar>
        </GridCol>
      </GridRow>
      {/* <GridRow>
        {showMetrics ? (
          <>
            <GridCol sm={12} md={8} lg={8}>
              <NewFundPerformanceChart address={address} />
            </GridCol>
            <GridCol sm={12} md={4} lg={4}>
              <FundSharePriceMetrics address={address} />
            </GridCol>
          </>
        ) : (
          <GridCol>
            <NewFundPerformanceChart address={address} />
          </GridCol>
        )}
      </GridRow>
      <GridRow>
        <GridCol>
          <FundMonthlyReturnTable address={address} />
        </GridCol>
      </GridRow> */}
      <GridRow>
        <GridCol>
          <FundHoldings address={address} />
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol>
          <FundDiligence address={address} />
        </GridCol>
      </GridRow>
    </Grid>
  );
};

export default FundOverview;
