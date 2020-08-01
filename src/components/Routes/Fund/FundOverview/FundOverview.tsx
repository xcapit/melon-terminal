import React from 'react';
import { FundHoldings } from '../FundHoldings/FundHoldings';
import { NewFundPerformanceChart } from '../FundPerformanceChart/FundPerformanceChart';
import { Grid, GridRow, GridCol } from '~/storybook/Grid/Grid';
import { FundDiligence } from '../FundDiligence/FundDiligence';
import { NotificationBar, NotificationContent } from '~/storybook/NotificationBar/NotificationBar';

export interface FundOverviewProps {
  address: string;
}

export const FundOverview: React.FC<FundOverviewProps> = ({ address }) => (
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
            The metrics component is currently underg maintenance and will be back soon.
          </NotificationContent>
        </NotificationBar>
      </GridCol>
    </GridRow>
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

export default FundOverview;
