import React from 'react';
import { Column, useTable, useSortBy, usePagination, useFilters } from 'react-table';
import { useFundOverviewQuery } from './FundOverview.queries';
import { FormattedDate } from '~/components/Common/FormattedDate/FormattedDate';
import { CommonTable } from '~/components/Common/Table/Table';
import { TokenValue } from '~/TokenValue';
import { useEnvironment } from '~/hooks/useEnvironment';
import { TokenValueDisplay } from '~/components/Common/TokenValueDisplay/TokenValueDisplay';

type RowData = {
  name: string;
  inception: Date;
  holdings: TokenValue[];
};

const columns: Column<RowData>[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Inception',
    accessor: 'inception',
    sortType: 'datetime',
    Cell: (cell) => <FormattedDate timestamp={cell.value} />,
  },
  {
    Header: 'Portfolio',
    accessor: 'holdings',
    Cell: (cell) => (
      <ul>
        {cell.value.map((item) => (
          <li key={item.token.symbol}>
            <TokenValueDisplay value={item} />
          </li>
        ))}
      </ul>
    ),
  },
  // {
  //   Header: 'Protocol',
  //   accessor: 'version',
  // },
  // {
  //   Header: 'Status',
  //   accessor: 'status',
  // },
];

function useTableDate() {
  const [result] = useFundOverviewQuery();

  const environment = useEnvironment()!;
  const data = React.useMemo(() => {
    const funds = result.data?.funds ?? [];
    return funds.map<RowData>((item) => ({
      name: item.name,
      inception: item.inception as Date,
      holdings: item.portfolio.holdings.map((item) => {
        const token = environment.getToken(item.asset.symbol);
        return new TokenValue(token, item.quantity);
      }),
    }));
  }, [result.data]);

  return data;
}

export const FundOverview: React.FC = () => {
  const data = useTableDate();
  const pageCount = Math.ceil(data.length % 20);
  const table = useTable({ columns, data, pageCount }, useSortBy, usePagination);

  return <CommonTable table={table} />;
};
