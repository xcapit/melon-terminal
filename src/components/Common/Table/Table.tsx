import React from 'react';
import styled, { css } from 'styled-components';
import { TableInstance } from 'react-table';

export interface ScrollableTableProps {
  maxHeight?: string;
}

export const ScrollableTable = styled.div<ScrollableTableProps>`
  overflow: auto;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 25px;
  padding-bottom: 25px;

  ${(props) =>
    props.maxHeight &&
    `
    max-height: ${props.maxHeight};
  `}
`;

export const Table = styled.table`
  background-color: ${(props) => props.theme.mainColors.primary};
  width: 100%;
  border-spacing: 0;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.thead``;

export const TableFooter = styled.tfoot``;

export interface HeaderCellProps {
  hover?: boolean;
}

export const HeaderCell = styled.th<HeaderCellProps>`
  text-align: left;
  padding: ${(props) => props.theme.spaceUnits.s};
  cursor: ${(props) => props.hover && 'pointer'};
`;

export const HeaderCellRightAlign = styled.th<HeaderCellProps>`
  cursor: ${(props) => props.hover && 'pointer'};
  text-align: right;
  padding: ${(props) => props.theme.spaceUnits.s};
`;

export const HeaderRow = styled.tr`
  font-weight: bold;
  border-bottom: 1px solid ${(props) => props.theme.mainColors.textColor};
`;

export interface BodyCellProps {
  maxWidth?: string;
}

export const BodyCell = styled.td<BodyCellProps>`
  ${(props) =>
    props.maxWidth &&
    `
    max-width: ${props.maxWidth};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `}
  
  padding: ${(props) => props.theme.spaceUnits.s};
`;

export const BodyCellRightAlign = styled.td`
  padding: ${(props) => props.theme.spaceUnits.s};
  text-align: right;
`;

export interface BodyRowProps {
  highlighted?: boolean;
}

export const BodyRow = styled.tr<BodyRowProps>`
  line-height: 1;
  border-top: 1px solid ${(props) => props.theme.mainColors.secondaryDarkAlpha};

  &:not(:last-child) {
    border-bottom: 1px dashed ${(props) => props.theme.mainColors.border};
  }

  ${(props) => {
    if (props.highlighted) {
      return css`
        background-color: ${(props) => props.theme.mainColors.secondary};
      `;
    }
  }}
`;

export const NoEntries = styled.div``;

export const BodyRowHover = styled(BodyRow)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.mainColors.secondary};
  }
`;

export interface CommonTableProps<TData extends object = any> {
  table: TableInstance<TData>;
}

export function CommonTable<TData extends object>(props: CommonTableProps<TData>) {
  const header = props.table.headerGroups.map((headerGroup) => (
    <HeaderRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <HeaderCell {...column.getHeaderProps(column.getSortByToggleProps())}>
          {column.render('Header')}
          <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
        </HeaderCell>
      ))}
    </HeaderRow>
  ));

  const paginated = typeof props.table.page !== 'undefined';
  const rows = paginated ? props.table.page : props.table.rows;
  const body = rows.map((row) => {
    props.table.prepareRow(row);

    return (
      <BodyRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <BodyCell {...cell.getCellProps()}>{cell.render('Cell')}</BodyCell>
        ))}
      </BodyRow>
    );
  });

  const pagination = paginated ? (
    <div className="pagination">
      <button onClick={() => props.table.gotoPage(0)} disabled={!props.table.canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => props.table.previousPage()} disabled={!props.table.canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => props.table.nextPage()} disabled={!props.table.canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => props.table.gotoPage(props.table.pageCount - 1)} disabled={!props.table.canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {props.table.state.pageIndex + 1} of {props.table.pageOptions.length}
        </strong>{' '}
      </span>
    </div>
  ) : null;

  return (
    <>
      <Table {...props.table.getTableProps()}>
        <TableHeader>{header}</TableHeader>
        <TableBody {...props.table.getTableBodyProps()}>{body}</TableBody>
      </Table>

      {pagination}
    </>
  );
}
