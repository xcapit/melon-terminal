import * as R from 'ramda';
import gql from 'graphql-tag';
import { TokenDefinition } from '~/types';

const deployment = process.env.DEPLOYMENT;
const tokens = R.pathOr<TokenDefinition[]>([], ['thirdPartyContracts', 'tokens'], deployment);
const defaults = {
  ETH: 'ETH',
};

export const TokenEnum = tokens.reduce((carry, current) => {
  return { ...carry, [current.symbol]: current.address };
}, defaults);

const values = Object.keys(TokenEnum).join('\n');
export const TokenEnumDefinition = gql`
  enum TokenEnum {
    ${values}
  }
`;
