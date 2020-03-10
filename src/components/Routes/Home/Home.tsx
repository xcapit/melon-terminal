import React from 'react';
import { Grid, GridCol, GridRow } from '~/storybook/components/Grid/Grid';
import { Container } from '~/storybook/components/Container/Container';
import { FundMetrics } from '~/components/Routes/Home/FundMetrics/FundMetrics';
import { FundOverview } from '~/components/Routes/Home/FundOverview/FundOverview';
import { NotificationBar, NotificationContent } from '~/storybook/components/NotificationBar/NotificationBar';

export const Home: React.FC = () => {
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridCol>
            <NotificationBar kind="error">
              <NotificationContent>
                The Melon subgraph, which provides overview data for the Melon Terminal, is under maintenance and will
                be operational again in a couple of hours.
                <br />
                Meanwhile all funds are operational i.e. you can invest and trade.
              </NotificationContent>
            </NotificationBar>
            <FundMetrics />
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol>
            <FundOverview />
          </GridCol>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default Home;
