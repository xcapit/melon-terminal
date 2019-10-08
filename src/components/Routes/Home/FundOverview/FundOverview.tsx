import React from 'react';
import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import { useHistory } from 'react-router';
import { useTable } from 'react-table';
import { fromWei } from 'web3-utils';
import { useTheGraphQuery } from '../../../../hooks/useQuery';
import { Spinner } from '../../../Common/Spinner/Spinner';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Share price',
    accessor: (row: any) => new BigNumber(`${fromWei(row.sharePrice, 'ether')}`).toFixed(4),
  },
  {
    Header: 'AUM',
    accessor: (row: any) => new BigNumber(`${fromWei(row.gav, 'ether')}`).toFixed(4),
  },
  {
    Header: 'Inception date',
    accessor: (row: any) => new Date(row.createdAt * 1000),
  },
];

const rankingQuery = gql`
  query FundRankingQuery {
    funds(orderBy: name) {
      id
      name
      gav
      sharePrice
      totalSupply
      isShutdown
      createdAt
      version {
        id
        name
      }
    }
  }
`;

export const FundOverview: React.FC = () => {
  const history = useHistory();
  const { data: { funds } = { funds: [] }, loading } = useTheGraphQuery<any>(rankingQuery);
  const { getTableProps, headerGroups, rows, prepareRow } = useTable<any>({ columns, data: funds } as any);

  if (loading) {
    return <Spinner positioning="centered" size="large" />;
  }

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          row =>
            prepareRow(row) || (
              <tr {...row.getRowProps({ onClick: () => history.push(`/fund/${row.original.id}`) })}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};
