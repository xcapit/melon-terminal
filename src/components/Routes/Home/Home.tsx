import React from 'react';
import { Grid, GridCol, GridRow } from '~/storybook/Grid/Grid';
import { Container } from '~/storybook/Container/Container';
import { FundMetrics } from '~/components/Routes/Home/FundMetrics/FundMetrics';
import { FundOverview } from '~/components/Routes/Home/FundOverview/FundOverview.new';

export const Home: React.FC = () => {
  return (
    <Container>
      <Grid>
        <GridRow>
          <GridCol>
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
