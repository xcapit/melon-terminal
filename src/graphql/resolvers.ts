import { default as ActualBigNumber } from 'bignumber.js';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import * as Query from './resolvers/Query';
import * as Account from './resolvers/Account';
import * as Fund from './resolvers/Fund';
import * as Block from './resolvers/Block';

export { Query, Account, Fund, Block };
export { GraphQLDateTime as DateTime } from 'graphql-iso-date';

export const BigNumber = new GraphQLScalarType({
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
