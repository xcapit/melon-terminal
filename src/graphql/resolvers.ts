import { default as ActualBigNumber } from 'bignumber.js';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import * as Query from '~/graphql/resolvers/Query';
import * as Account from '~/graphql/resolvers/Account';
import * as Fund from '~/graphql/resolvers/Fund';
import * as Block from '~/graphql/resolvers/Block';

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  serialize: value => {
    if (value instanceof Date) {
      return value;
    }

    return new Date(value);
  },
  parseValue: value => {
    if (value instanceof Date) {
      return value;
    }

    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }

    return null;
  },
});

const BigNumber = new GraphQLScalarType({
  name: 'BigNumber',
  serialize: value => {
    if (ActualBigNumber.isBigNumber(value)) {
      return value;
    }

    return new ActualBigNumber(value);
  },
  parseValue: value => {
    if (ActualBigNumber.isBigNumber(value)) {
      return value;
    }

    return new ActualBigNumber(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return new ActualBigNumber(ast.value);
    }

    return null;
  },
});

export { Query, Account, Fund, Block, DateTime, BigNumber };
