import { default as ActualBigNumber } from 'bignumber.js';
import { GraphQLScalarType, Kind } from 'graphql';

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
