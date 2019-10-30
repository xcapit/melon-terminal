import { GraphQLScalarType, Kind } from 'graphql';

export const DateTime = new GraphQLScalarType({
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
