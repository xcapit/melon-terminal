import BigNumber from 'bignumber.js';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: BigNumber;
  BigInt: Date | BigNumber;
  Bytes: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  manager: Scalars['Boolean'];
  managements: Array<Fund>;
  investor: Scalars['Boolean'];
  investments: Array<Investment>;
  requests: Array<Investment>;
};

export type AccountManagementsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FundOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FundFilter>;
};

export type AccountInvestmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentFilter>;
};

export type AccountRequestsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentFilter>;
};

export type AccountFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  manager?: Maybe<Scalars['Boolean']>;
  manager_not?: Maybe<Scalars['Boolean']>;
  manager_in?: Maybe<Array<Scalars['Boolean']>>;
  manager_not_in?: Maybe<Array<Scalars['Boolean']>>;
  investor?: Maybe<Scalars['Boolean']>;
  investor_not?: Maybe<Scalars['Boolean']>;
  investor_in?: Maybe<Array<Scalars['Boolean']>>;
  investor_not_in?: Maybe<Array<Scalars['Boolean']>>;
};

export enum AccountOrderBy {
  ID = 'id',
  MANAGER = 'manager',
  MANAGEMENTS = 'managements',
  INVESTOR = 'investor',
  INVESTMENTS = 'investments',
  REQUESTS = 'requests',
}

export type Asset = {
  __typename?: 'Asset';
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  decimals: Scalars['Int'];
};

export type AssetBlacklistPolicy = Policy & {
  __typename?: 'AssetBlacklistPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type AssetBlacklistPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum AssetBlacklistPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type AssetWhitelistPolicy = Policy & {
  __typename?: 'AssetWhitelistPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type AssetWhitelistPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum AssetWhitelistPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type AssetFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  symbol_not?: Maybe<Scalars['String']>;
  symbol_gt?: Maybe<Scalars['String']>;
  symbol_lt?: Maybe<Scalars['String']>;
  symbol_gte?: Maybe<Scalars['String']>;
  symbol_lte?: Maybe<Scalars['String']>;
  symbol_in?: Maybe<Array<Scalars['String']>>;
  symbol_not_in?: Maybe<Array<Scalars['String']>>;
  symbol_contains?: Maybe<Scalars['String']>;
  symbol_not_contains?: Maybe<Scalars['String']>;
  symbol_starts_with?: Maybe<Scalars['String']>;
  symbol_not_starts_with?: Maybe<Scalars['String']>;
  symbol_ends_with?: Maybe<Scalars['String']>;
  symbol_not_ends_with?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  decimals_not?: Maybe<Scalars['Int']>;
  decimals_gt?: Maybe<Scalars['Int']>;
  decimals_lt?: Maybe<Scalars['Int']>;
  decimals_gte?: Maybe<Scalars['Int']>;
  decimals_lte?: Maybe<Scalars['Int']>;
  decimals_in?: Maybe<Array<Scalars['Int']>>;
  decimals_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum AssetOrderBy {
  ID = 'id',
  NAME = 'name',
  SYMBOL = 'symbol',
  DECIMALS = 'decimals',
}

export type BlockHeight = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type ContractEvent = {
  __typename?: 'ContractEvent';
  id: Scalars['ID'];
  version: Version;
  fund?: Maybe<Fund>;
  name: Scalars['String'];
  contract: Scalars['String'];
  transaction: Scalars['String'];
  from: Scalars['String'];
  timestamp: Scalars['BigInt'];
  block: Scalars['BigInt'];
};

export type ContractEventFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  contract?: Maybe<Scalars['String']>;
  contract_not?: Maybe<Scalars['String']>;
  contract_gt?: Maybe<Scalars['String']>;
  contract_lt?: Maybe<Scalars['String']>;
  contract_gte?: Maybe<Scalars['String']>;
  contract_lte?: Maybe<Scalars['String']>;
  contract_in?: Maybe<Array<Scalars['String']>>;
  contract_not_in?: Maybe<Array<Scalars['String']>>;
  contract_contains?: Maybe<Scalars['String']>;
  contract_not_contains?: Maybe<Scalars['String']>;
  contract_starts_with?: Maybe<Scalars['String']>;
  contract_not_starts_with?: Maybe<Scalars['String']>;
  contract_ends_with?: Maybe<Scalars['String']>;
  contract_not_ends_with?: Maybe<Scalars['String']>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  from_not?: Maybe<Scalars['String']>;
  from_gt?: Maybe<Scalars['String']>;
  from_lt?: Maybe<Scalars['String']>;
  from_gte?: Maybe<Scalars['String']>;
  from_lte?: Maybe<Scalars['String']>;
  from_in?: Maybe<Array<Scalars['String']>>;
  from_not_in?: Maybe<Array<Scalars['String']>>;
  from_contains?: Maybe<Scalars['String']>;
  from_not_contains?: Maybe<Scalars['String']>;
  from_starts_with?: Maybe<Scalars['String']>;
  from_not_starts_with?: Maybe<Scalars['String']>;
  from_ends_with?: Maybe<Scalars['String']>;
  from_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  block?: Maybe<Scalars['BigInt']>;
  block_not?: Maybe<Scalars['BigInt']>;
  block_gt?: Maybe<Scalars['BigInt']>;
  block_lt?: Maybe<Scalars['BigInt']>;
  block_gte?: Maybe<Scalars['BigInt']>;
  block_lte?: Maybe<Scalars['BigInt']>;
  block_in?: Maybe<Array<Scalars['BigInt']>>;
  block_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum ContractEventOrderBy {
  ID = 'id',
  VERSION = 'version',
  FUND = 'fund',
  NAME = 'name',
  CONTRACT = 'contract',
  TRANSACTION = 'transaction',
  FROM = 'from',
  TIMESTAMP = 'timestamp',
  BLOCK = 'block',
}

export type CustomFee = Fee & {
  __typename?: 'CustomFee';
  id: Scalars['ID'];
  fund: Fund;
  identifier: FeeIdentifierEnum;
};

export type CustomFeeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  identifier?: Maybe<FeeIdentifierEnum>;
  identifier_not?: Maybe<FeeIdentifierEnum>;
};

export enum CustomFeeOrderBy {
  ID = 'id',
  FUND = 'fund',
  IDENTIFIER = 'identifier',
}

export type CustomPolicy = Policy & {
  __typename?: 'CustomPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type CustomPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum CustomPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type Event = {
  id: Scalars['ID'];
  kind: EventKindEnum;
  fund: Fund;
  version: Version;
  timestamp: Scalars['BigInt'];
  trigger: ContractEvent;
};

export enum EventKindEnum {
  INVESTMENT = 'INVESTMENT',
  REDEMPTION = 'REDEMPTION',
  REWARD = 'REWARD',
  TRADE = 'TRADE',
}

export type EventFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
};

export enum EventOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  TIMESTAMP = 'timestamp',
  TRIGGER = 'trigger',
}

export type Exchange = {
  __typename?: 'Exchange';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ExchangeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
};

export enum ExchangeOrderBy {
  ID = 'id',
  NAME = 'name',
}

export type Fee = {
  id: Scalars['ID'];
  fund: Fund;
  identifier: FeeIdentifierEnum;
};

export enum FeeIdentifierEnum {
  CUSTOM = 'CUSTOM',
  MANAGEMENT = 'MANAGEMENT',
  PERFORMANCE = 'PERFORMANCE',
}

export type FeeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  identifier?: Maybe<FeeIdentifierEnum>;
  identifier_not?: Maybe<FeeIdentifierEnum>;
};

export enum FeeOrderBy {
  ID = 'id',
  FUND = 'fund',
  IDENTIFIER = 'identifier',
}

export type Fund = {
  __typename?: 'Fund';
  id: Scalars['ID'];
  name: Scalars['String'];
  version: Version;
  active: Scalars['Boolean'];
  manager: Account;
  inception: Scalars['BigInt'];
  denominationAsset: Asset;
  investable: Array<Asset>;
  events: Array<Event>;
  investments: Array<Investment>;
  policies: Array<Policy>;
  fees: Array<Fee>;
  trades: Array<Trade>;
  shares: Share;
  sharesHistory: Array<Share>;
  portfolio: Portfolio;
  portfolioHistory: Array<Portfolio>;
  payouts: Payout;
  payoutsHistory: Array<Payout>;
  state: State;
  stateHistory: Array<State>;
};

export type FundInvestableArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetFilter>;
};

export type FundEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type FundInvestmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentFilter>;
};

export type FundPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PolicyFilter>;
};

export type FundFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FeeFilter>;
};

export type FundTradesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TradeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TradeFilter>;
};

export type FundSharesHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareFilter>;
};

export type FundPortfolioHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PortfolioOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PortfolioFilter>;
};

export type FundPayoutsHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PayoutFilter>;
};

export type FundStateHistoryArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StateOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StateFilter>;
};

export type FundFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  active_not?: Maybe<Scalars['Boolean']>;
  active_in?: Maybe<Array<Scalars['Boolean']>>;
  active_not_in?: Maybe<Array<Scalars['Boolean']>>;
  manager?: Maybe<Scalars['String']>;
  manager_not?: Maybe<Scalars['String']>;
  manager_gt?: Maybe<Scalars['String']>;
  manager_lt?: Maybe<Scalars['String']>;
  manager_gte?: Maybe<Scalars['String']>;
  manager_lte?: Maybe<Scalars['String']>;
  manager_in?: Maybe<Array<Scalars['String']>>;
  manager_not_in?: Maybe<Array<Scalars['String']>>;
  manager_contains?: Maybe<Scalars['String']>;
  manager_not_contains?: Maybe<Scalars['String']>;
  manager_starts_with?: Maybe<Scalars['String']>;
  manager_not_starts_with?: Maybe<Scalars['String']>;
  manager_ends_with?: Maybe<Scalars['String']>;
  manager_not_ends_with?: Maybe<Scalars['String']>;
  inception?: Maybe<Scalars['BigInt']>;
  inception_not?: Maybe<Scalars['BigInt']>;
  inception_gt?: Maybe<Scalars['BigInt']>;
  inception_lt?: Maybe<Scalars['BigInt']>;
  inception_gte?: Maybe<Scalars['BigInt']>;
  inception_lte?: Maybe<Scalars['BigInt']>;
  inception_in?: Maybe<Array<Scalars['BigInt']>>;
  inception_not_in?: Maybe<Array<Scalars['BigInt']>>;
  denominationAsset?: Maybe<Scalars['String']>;
  denominationAsset_not?: Maybe<Scalars['String']>;
  denominationAsset_gt?: Maybe<Scalars['String']>;
  denominationAsset_lt?: Maybe<Scalars['String']>;
  denominationAsset_gte?: Maybe<Scalars['String']>;
  denominationAsset_lte?: Maybe<Scalars['String']>;
  denominationAsset_in?: Maybe<Array<Scalars['String']>>;
  denominationAsset_not_in?: Maybe<Array<Scalars['String']>>;
  denominationAsset_contains?: Maybe<Scalars['String']>;
  denominationAsset_not_contains?: Maybe<Scalars['String']>;
  denominationAsset_starts_with?: Maybe<Scalars['String']>;
  denominationAsset_not_starts_with?: Maybe<Scalars['String']>;
  denominationAsset_ends_with?: Maybe<Scalars['String']>;
  denominationAsset_not_ends_with?: Maybe<Scalars['String']>;
  investable?: Maybe<Array<Scalars['String']>>;
  investable_not?: Maybe<Array<Scalars['String']>>;
  investable_contains?: Maybe<Array<Scalars['String']>>;
  investable_not_contains?: Maybe<Array<Scalars['String']>>;
  fees?: Maybe<Array<Scalars['String']>>;
  fees_not?: Maybe<Array<Scalars['String']>>;
  fees_contains?: Maybe<Array<Scalars['String']>>;
  fees_not_contains?: Maybe<Array<Scalars['String']>>;
  shares?: Maybe<Scalars['String']>;
  shares_not?: Maybe<Scalars['String']>;
  shares_gt?: Maybe<Scalars['String']>;
  shares_lt?: Maybe<Scalars['String']>;
  shares_gte?: Maybe<Scalars['String']>;
  shares_lte?: Maybe<Scalars['String']>;
  shares_in?: Maybe<Array<Scalars['String']>>;
  shares_not_in?: Maybe<Array<Scalars['String']>>;
  shares_contains?: Maybe<Scalars['String']>;
  shares_not_contains?: Maybe<Scalars['String']>;
  shares_starts_with?: Maybe<Scalars['String']>;
  shares_not_starts_with?: Maybe<Scalars['String']>;
  shares_ends_with?: Maybe<Scalars['String']>;
  shares_not_ends_with?: Maybe<Scalars['String']>;
  portfolio?: Maybe<Scalars['String']>;
  portfolio_not?: Maybe<Scalars['String']>;
  portfolio_gt?: Maybe<Scalars['String']>;
  portfolio_lt?: Maybe<Scalars['String']>;
  portfolio_gte?: Maybe<Scalars['String']>;
  portfolio_lte?: Maybe<Scalars['String']>;
  portfolio_in?: Maybe<Array<Scalars['String']>>;
  portfolio_not_in?: Maybe<Array<Scalars['String']>>;
  portfolio_contains?: Maybe<Scalars['String']>;
  portfolio_not_contains?: Maybe<Scalars['String']>;
  portfolio_starts_with?: Maybe<Scalars['String']>;
  portfolio_not_starts_with?: Maybe<Scalars['String']>;
  portfolio_ends_with?: Maybe<Scalars['String']>;
  portfolio_not_ends_with?: Maybe<Scalars['String']>;
  payouts?: Maybe<Scalars['String']>;
  payouts_not?: Maybe<Scalars['String']>;
  payouts_gt?: Maybe<Scalars['String']>;
  payouts_lt?: Maybe<Scalars['String']>;
  payouts_gte?: Maybe<Scalars['String']>;
  payouts_lte?: Maybe<Scalars['String']>;
  payouts_in?: Maybe<Array<Scalars['String']>>;
  payouts_not_in?: Maybe<Array<Scalars['String']>>;
  payouts_contains?: Maybe<Scalars['String']>;
  payouts_not_contains?: Maybe<Scalars['String']>;
  payouts_starts_with?: Maybe<Scalars['String']>;
  payouts_not_starts_with?: Maybe<Scalars['String']>;
  payouts_ends_with?: Maybe<Scalars['String']>;
  payouts_not_ends_with?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  state_not?: Maybe<Scalars['String']>;
  state_gt?: Maybe<Scalars['String']>;
  state_lt?: Maybe<Scalars['String']>;
  state_gte?: Maybe<Scalars['String']>;
  state_lte?: Maybe<Scalars['String']>;
  state_in?: Maybe<Array<Scalars['String']>>;
  state_not_in?: Maybe<Array<Scalars['String']>>;
  state_contains?: Maybe<Scalars['String']>;
  state_not_contains?: Maybe<Scalars['String']>;
  state_starts_with?: Maybe<Scalars['String']>;
  state_not_starts_with?: Maybe<Scalars['String']>;
  state_ends_with?: Maybe<Scalars['String']>;
  state_not_ends_with?: Maybe<Scalars['String']>;
};

export enum FundOrderBy {
  ID = 'id',
  NAME = 'name',
  VERSION = 'version',
  ACTIVE = 'active',
  MANAGER = 'manager',
  INCEPTION = 'inception',
  DENOMINATIONASSET = 'denominationAsset',
  INVESTABLE = 'investable',
  EVENTS = 'events',
  INVESTMENTS = 'investments',
  POLICIES = 'policies',
  FEES = 'fees',
  TRADES = 'trades',
  SHARES = 'shares',
  SHARESHISTORY = 'sharesHistory',
  PORTFOLIO = 'portfolio',
  PORTFOLIOHISTORY = 'portfolioHistory',
  PAYOUTS = 'payouts',
  PAYOUTSHISTORY = 'payoutsHistory',
  STATE = 'state',
  STATEHISTORY = 'stateHistory',
}

export type Holding = Metric & {
  __typename?: 'Holding';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  asset: Asset;
  quantity: Scalars['BigDecimal'];
  events: Array<Event>;
};

export type HoldingEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type HoldingFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  asset?: Maybe<Scalars['String']>;
  asset_not?: Maybe<Scalars['String']>;
  asset_gt?: Maybe<Scalars['String']>;
  asset_lt?: Maybe<Scalars['String']>;
  asset_gte?: Maybe<Scalars['String']>;
  asset_lte?: Maybe<Scalars['String']>;
  asset_in?: Maybe<Array<Scalars['String']>>;
  asset_not_in?: Maybe<Array<Scalars['String']>>;
  asset_contains?: Maybe<Scalars['String']>;
  asset_not_contains?: Maybe<Scalars['String']>;
  asset_starts_with?: Maybe<Scalars['String']>;
  asset_not_starts_with?: Maybe<Scalars['String']>;
  asset_ends_with?: Maybe<Scalars['String']>;
  asset_not_ends_with?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  quantity_not?: Maybe<Scalars['BigDecimal']>;
  quantity_gt?: Maybe<Scalars['BigDecimal']>;
  quantity_lt?: Maybe<Scalars['BigDecimal']>;
  quantity_gte?: Maybe<Scalars['BigDecimal']>;
  quantity_lte?: Maybe<Scalars['BigDecimal']>;
  quantity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  quantity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum HoldingOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  ASSET = 'asset',
  QUANTITY = 'quantity',
  EVENTS = 'events',
}

export type IndividualPayout = {
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  shares: Scalars['BigDecimal'];
  events: Array<Event>;
};

export type IndividualPayoutEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type IndividualPayoutFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum IndividualPayoutOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  SHARES = 'shares',
  EVENTS = 'events',
}

export type Investment = {
  __typename?: 'Investment';
  id: Scalars['ID'];
  fund: Fund;
  investor: Account;
  changes: Array<SharesChange>;
  shares: Scalars['BigDecimal'];
};

export type InvestmentChangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesChangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesChangeFilter>;
};

export type InvestmentRequest = {
  __typename?: 'InvestmentRequest';
  id: Scalars['ID'];
  fund: Fund;
  investor: Account;
  asset: Asset;
  quantity: Scalars['BigDecimal'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['String'];
};

export type InvestmentRequestFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  investor?: Maybe<Scalars['String']>;
  investor_not?: Maybe<Scalars['String']>;
  investor_gt?: Maybe<Scalars['String']>;
  investor_lt?: Maybe<Scalars['String']>;
  investor_gte?: Maybe<Scalars['String']>;
  investor_lte?: Maybe<Scalars['String']>;
  investor_in?: Maybe<Array<Scalars['String']>>;
  investor_not_in?: Maybe<Array<Scalars['String']>>;
  investor_contains?: Maybe<Scalars['String']>;
  investor_not_contains?: Maybe<Scalars['String']>;
  investor_starts_with?: Maybe<Scalars['String']>;
  investor_not_starts_with?: Maybe<Scalars['String']>;
  investor_ends_with?: Maybe<Scalars['String']>;
  investor_not_ends_with?: Maybe<Scalars['String']>;
  asset?: Maybe<Scalars['String']>;
  asset_not?: Maybe<Scalars['String']>;
  asset_gt?: Maybe<Scalars['String']>;
  asset_lt?: Maybe<Scalars['String']>;
  asset_gte?: Maybe<Scalars['String']>;
  asset_lte?: Maybe<Scalars['String']>;
  asset_in?: Maybe<Array<Scalars['String']>>;
  asset_not_in?: Maybe<Array<Scalars['String']>>;
  asset_contains?: Maybe<Scalars['String']>;
  asset_not_contains?: Maybe<Scalars['String']>;
  asset_starts_with?: Maybe<Scalars['String']>;
  asset_not_starts_with?: Maybe<Scalars['String']>;
  asset_ends_with?: Maybe<Scalars['String']>;
  asset_not_ends_with?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  quantity_not?: Maybe<Scalars['BigDecimal']>;
  quantity_gt?: Maybe<Scalars['BigDecimal']>;
  quantity_lt?: Maybe<Scalars['BigDecimal']>;
  quantity_gte?: Maybe<Scalars['BigDecimal']>;
  quantity_lte?: Maybe<Scalars['BigDecimal']>;
  quantity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  quantity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
};

export enum InvestmentRequestOrderBy {
  ID = 'id',
  FUND = 'fund',
  INVESTOR = 'investor',
  ASSET = 'asset',
  QUANTITY = 'quantity',
  TIMESTAMP = 'timestamp',
  TRANSACTION = 'transaction',
}

export type InvestmentFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  investor?: Maybe<Scalars['String']>;
  investor_not?: Maybe<Scalars['String']>;
  investor_gt?: Maybe<Scalars['String']>;
  investor_lt?: Maybe<Scalars['String']>;
  investor_gte?: Maybe<Scalars['String']>;
  investor_lte?: Maybe<Scalars['String']>;
  investor_in?: Maybe<Array<Scalars['String']>>;
  investor_not_in?: Maybe<Array<Scalars['String']>>;
  investor_contains?: Maybe<Scalars['String']>;
  investor_not_contains?: Maybe<Scalars['String']>;
  investor_starts_with?: Maybe<Scalars['String']>;
  investor_not_starts_with?: Maybe<Scalars['String']>;
  investor_ends_with?: Maybe<Scalars['String']>;
  investor_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum InvestmentOrderBy {
  ID = 'id',
  FUND = 'fund',
  INVESTOR = 'investor',
  CHANGES = 'changes',
  SHARES = 'shares',
}

export type ManagementFee = Fee & {
  __typename?: 'ManagementFee';
  id: Scalars['ID'];
  fund: Fund;
  identifier: FeeIdentifierEnum;
  rate: Scalars['BigDecimal'];
};

export type ManagementFeePayout = IndividualPayout &
  Metric & {
    __typename?: 'ManagementFeePayout';
    id: Scalars['ID'];
    fund: Fund;
    timestamp: Scalars['BigInt'];
    fee: ManagementFee;
    shares: Scalars['BigDecimal'];
    events: Array<Event>;
  };

export type ManagementFeePayoutEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type ManagementFeePayoutFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fee?: Maybe<Scalars['String']>;
  fee_not?: Maybe<Scalars['String']>;
  fee_gt?: Maybe<Scalars['String']>;
  fee_lt?: Maybe<Scalars['String']>;
  fee_gte?: Maybe<Scalars['String']>;
  fee_lte?: Maybe<Scalars['String']>;
  fee_in?: Maybe<Array<Scalars['String']>>;
  fee_not_in?: Maybe<Array<Scalars['String']>>;
  fee_contains?: Maybe<Scalars['String']>;
  fee_not_contains?: Maybe<Scalars['String']>;
  fee_starts_with?: Maybe<Scalars['String']>;
  fee_not_starts_with?: Maybe<Scalars['String']>;
  fee_ends_with?: Maybe<Scalars['String']>;
  fee_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum ManagementFeePayoutOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  FEE = 'fee',
  SHARES = 'shares',
  EVENTS = 'events',
}

export type ManagementFeeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  identifier?: Maybe<FeeIdentifierEnum>;
  identifier_not?: Maybe<FeeIdentifierEnum>;
  rate?: Maybe<Scalars['BigDecimal']>;
  rate_not?: Maybe<Scalars['BigDecimal']>;
  rate_gt?: Maybe<Scalars['BigDecimal']>;
  rate_lt?: Maybe<Scalars['BigDecimal']>;
  rate_gte?: Maybe<Scalars['BigDecimal']>;
  rate_lte?: Maybe<Scalars['BigDecimal']>;
  rate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  rate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
};

export enum ManagementFeeOrderBy {
  ID = 'id',
  FUND = 'fund',
  IDENTIFIER = 'identifier',
  RATE = 'rate',
}

export type MaxConcentrationPolicy = Policy & {
  __typename?: 'MaxConcentrationPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type MaxConcentrationPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum MaxConcentrationPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type MaxPositionsPolicy = Policy & {
  __typename?: 'MaxPositionsPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type MaxPositionsPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum MaxPositionsPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type Metric = {
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  events: Array<Event>;
};

export type MetricEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type MetricFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum MetricOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  EVENTS = 'events',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type Payout = Metric & {
  __typename?: 'Payout';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  shares: Scalars['BigDecimal'];
  payouts: Array<IndividualPayout>;
  events: Array<Event>;
};

export type PayoutPayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IndividualPayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IndividualPayoutFilter>;
};

export type PayoutEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type PayoutFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  payouts?: Maybe<Array<Scalars['String']>>;
  payouts_not?: Maybe<Array<Scalars['String']>>;
  payouts_contains?: Maybe<Array<Scalars['String']>>;
  payouts_not_contains?: Maybe<Array<Scalars['String']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum PayoutOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  SHARES = 'shares',
  PAYOUTS = 'payouts',
  EVENTS = 'events',
}

export type PerformanceFee = Fee & {
  __typename?: 'PerformanceFee';
  id: Scalars['ID'];
  fund: Fund;
  identifier: FeeIdentifierEnum;
  rate: Scalars['BigDecimal'];
  period: Scalars['BigInt'];
  initializeTime: Scalars['BigInt'];
};

export type PerformanceFeePayout = IndividualPayout &
  Metric & {
    __typename?: 'PerformanceFeePayout';
    id: Scalars['ID'];
    fund: Fund;
    timestamp: Scalars['BigInt'];
    fee: PerformanceFee;
    shares: Scalars['BigDecimal'];
    highWaterMark?: Maybe<Scalars['BigDecimal']>;
    events: Array<Event>;
  };

export type PerformanceFeePayoutEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type PerformanceFeePayoutFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fee?: Maybe<Scalars['String']>;
  fee_not?: Maybe<Scalars['String']>;
  fee_gt?: Maybe<Scalars['String']>;
  fee_lt?: Maybe<Scalars['String']>;
  fee_gte?: Maybe<Scalars['String']>;
  fee_lte?: Maybe<Scalars['String']>;
  fee_in?: Maybe<Array<Scalars['String']>>;
  fee_not_in?: Maybe<Array<Scalars['String']>>;
  fee_contains?: Maybe<Scalars['String']>;
  fee_not_contains?: Maybe<Scalars['String']>;
  fee_starts_with?: Maybe<Scalars['String']>;
  fee_not_starts_with?: Maybe<Scalars['String']>;
  fee_ends_with?: Maybe<Scalars['String']>;
  fee_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  highWaterMark?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_not?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_gt?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_lt?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_gte?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_lte?: Maybe<Scalars['BigDecimal']>;
  highWaterMark_in?: Maybe<Array<Scalars['BigDecimal']>>;
  highWaterMark_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum PerformanceFeePayoutOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  FEE = 'fee',
  SHARES = 'shares',
  HIGHWATERMARK = 'highWaterMark',
  EVENTS = 'events',
}

export type PerformanceFeeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  identifier?: Maybe<FeeIdentifierEnum>;
  identifier_not?: Maybe<FeeIdentifierEnum>;
  rate?: Maybe<Scalars['BigDecimal']>;
  rate_not?: Maybe<Scalars['BigDecimal']>;
  rate_gt?: Maybe<Scalars['BigDecimal']>;
  rate_lt?: Maybe<Scalars['BigDecimal']>;
  rate_gte?: Maybe<Scalars['BigDecimal']>;
  rate_lte?: Maybe<Scalars['BigDecimal']>;
  rate_in?: Maybe<Array<Scalars['BigDecimal']>>;
  rate_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  period?: Maybe<Scalars['BigInt']>;
  period_not?: Maybe<Scalars['BigInt']>;
  period_gt?: Maybe<Scalars['BigInt']>;
  period_lt?: Maybe<Scalars['BigInt']>;
  period_gte?: Maybe<Scalars['BigInt']>;
  period_lte?: Maybe<Scalars['BigInt']>;
  period_in?: Maybe<Array<Scalars['BigInt']>>;
  period_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initializeTime?: Maybe<Scalars['BigInt']>;
  initializeTime_not?: Maybe<Scalars['BigInt']>;
  initializeTime_gt?: Maybe<Scalars['BigInt']>;
  initializeTime_lt?: Maybe<Scalars['BigInt']>;
  initializeTime_gte?: Maybe<Scalars['BigInt']>;
  initializeTime_lte?: Maybe<Scalars['BigInt']>;
  initializeTime_in?: Maybe<Array<Scalars['BigInt']>>;
  initializeTime_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PerformanceFeeOrderBy {
  ID = 'id',
  FUND = 'fund',
  IDENTIFIER = 'identifier',
  RATE = 'rate',
  PERIOD = 'period',
  INITIALIZETIME = 'initializeTime',
}

export type Policy = {
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export enum PolicyIdentifierEnum {
  CUSTOM = 'CUSTOM',
  MAX_CONCENTRATION = 'MAX_CONCENTRATION',
  MAX_POSITIONS = 'MAX_POSITIONS',
  PRICE_TOLERANCE = 'PRICE_TOLERANCE',
  USER_WHITELIST = 'USER_WHITELIST',
  ASSET_BLACKLIST = 'ASSET_BLACKLIST',
  ASSET_WHITELIST = 'ASSET_WHITELIST',
}

export type PolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum PolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type Portfolio = Metric & {
  __typename?: 'Portfolio';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  holdings: Array<Holding>;
  events: Array<Event>;
};

export type PortfolioHoldingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HoldingOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<HoldingFilter>;
};

export type PortfolioEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type PortfolioFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  holdings?: Maybe<Array<Scalars['String']>>;
  holdings_not?: Maybe<Array<Scalars['String']>>;
  holdings_contains?: Maybe<Array<Scalars['String']>>;
  holdings_not_contains?: Maybe<Array<Scalars['String']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum PortfolioOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  HOLDINGS = 'holdings',
  EVENTS = 'events',
}

export type PriceTolerancePolicy = Policy & {
  __typename?: 'PriceTolerancePolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type PriceTolerancePolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum PriceTolerancePolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type Query = {
  __typename?: 'Query';
  contractEvent?: Maybe<ContractEvent>;
  contractEvents: Array<ContractEvent>;
  version?: Maybe<Version>;
  versions: Array<Version>;
  share?: Maybe<Share>;
  shares: Array<Share>;
  holding?: Maybe<Holding>;
  holdings: Array<Holding>;
  portfolio?: Maybe<Portfolio>;
  portfolios: Array<Portfolio>;
  payout?: Maybe<Payout>;
  payouts: Array<Payout>;
  managementFeePayout?: Maybe<ManagementFeePayout>;
  managementFeePayouts: Array<ManagementFeePayout>;
  performanceFeePayout?: Maybe<PerformanceFeePayout>;
  performanceFeePayouts: Array<PerformanceFeePayout>;
  state?: Maybe<State>;
  states: Array<State>;
  fund?: Maybe<Fund>;
  funds: Array<Fund>;
  customFee?: Maybe<CustomFee>;
  customFees: Array<CustomFee>;
  performanceFee?: Maybe<PerformanceFee>;
  performanceFees: Array<PerformanceFee>;
  managementFee?: Maybe<ManagementFee>;
  managementFees: Array<ManagementFee>;
  customPolicy?: Maybe<CustomPolicy>;
  customPolicies: Array<CustomPolicy>;
  userWhitelistPolicy?: Maybe<UserWhitelistPolicy>;
  userWhitelistPolicies: Array<UserWhitelistPolicy>;
  priceTolerancePolicy?: Maybe<PriceTolerancePolicy>;
  priceTolerancePolicies: Array<PriceTolerancePolicy>;
  maxPositionsPolicy?: Maybe<MaxPositionsPolicy>;
  maxPositionsPolicies: Array<MaxPositionsPolicy>;
  maxConcentrationPolicy?: Maybe<MaxConcentrationPolicy>;
  maxConcentrationPolicies: Array<MaxConcentrationPolicy>;
  assetBlacklistPolicy?: Maybe<AssetBlacklistPolicy>;
  assetBlacklistPolicies: Array<AssetBlacklistPolicy>;
  assetWhitelistPolicy?: Maybe<AssetWhitelistPolicy>;
  assetWhitelistPolicies: Array<AssetWhitelistPolicy>;
  sharesAddition?: Maybe<SharesAddition>;
  sharesAdditions: Array<SharesAddition>;
  sharesRedemption?: Maybe<SharesRedemption>;
  sharesRedemptions: Array<SharesRedemption>;
  sharesReward?: Maybe<SharesReward>;
  sharesRewards: Array<SharesReward>;
  investmentRequest?: Maybe<InvestmentRequest>;
  investmentRequests: Array<InvestmentRequest>;
  investment?: Maybe<Investment>;
  investments: Array<Investment>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  trade?: Maybe<Trade>;
  trades: Array<Trade>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  event?: Maybe<Event>;
  events: Array<Event>;
  metric?: Maybe<Metric>;
  metrics: Array<Metric>;
  individualPayout?: Maybe<IndividualPayout>;
  individualPayouts: Array<IndividualPayout>;
  fee?: Maybe<Fee>;
  fees: Array<Fee>;
  policy?: Maybe<Policy>;
  policies: Array<Policy>;
  sharesChange?: Maybe<SharesChange>;
  sharesChanges: Array<SharesChange>;
};

export type QueryContractEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryContractEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractEventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractEventFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryVersionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryVersionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VersionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VersionFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryShareArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QuerySharesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryHoldingArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryHoldingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HoldingOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<HoldingFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPortfolioArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPortfoliosArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PortfolioOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PortfolioFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryManagementFeePayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryManagementFeePayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ManagementFeePayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ManagementFeePayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPerformanceFeePayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPerformanceFeePayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PerformanceFeePayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PerformanceFeePayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryStateArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryStatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StateOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StateFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryFundArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryFundsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FundOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FundFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryCustomFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryCustomFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CustomFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CustomFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPerformanceFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPerformanceFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PerformanceFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PerformanceFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryManagementFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryManagementFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ManagementFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ManagementFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryCustomPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryCustomPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CustomPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CustomPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryUserWhitelistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryUserWhitelistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserWhitelistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserWhitelistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPriceTolerancePolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPriceTolerancePoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceTolerancePolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceTolerancePolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryMaxPositionsPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryMaxPositionsPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaxPositionsPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MaxPositionsPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryMaxConcentrationPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryMaxConcentrationPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaxConcentrationPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MaxConcentrationPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryAssetBlacklistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryAssetBlacklistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetBlacklistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetBlacklistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryAssetWhitelistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryAssetWhitelistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetWhitelistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetWhitelistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QuerySharesAdditionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QuerySharesAdditionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesAdditionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesAdditionFilter>;
  block?: Maybe<BlockHeight>;
};

export type QuerySharesRedemptionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QuerySharesRedemptionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesRedemptionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesRedemptionFilter>;
  block?: Maybe<BlockHeight>;
};

export type QuerySharesRewardArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QuerySharesRewardsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesRewardOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesRewardFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryInvestmentRequestArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryInvestmentRequestsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentRequestOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentRequestFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryInvestmentArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryInvestmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryAccountArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryAccountsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryAssetArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryTradeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryTradesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TradeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TradeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryMetricArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryMetricsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MetricOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MetricFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryIndividualPayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryIndividualPayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IndividualPayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IndividualPayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type QueryPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QueryPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type QuerySharesChangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type QuerySharesChangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesChangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesChangeFilter>;
  block?: Maybe<BlockHeight>;
};

export type Share = Metric & {
  __typename?: 'Share';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  shares: Scalars['BigDecimal'];
  events: Array<Event>;
};

export type ShareEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type ShareFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum ShareOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  SHARES = 'shares',
  EVENTS = 'events',
}

export type SharesAddition = Event &
  SharesChange & {
    __typename?: 'SharesAddition';
    id: Scalars['ID'];
    kind: EventKindEnum;
    fund: Fund;
    version: Version;
    investor: Account;
    investment: Investment;
    shares: Scalars['BigDecimal'];
    asset: Asset;
    quantity: Scalars['BigDecimal'];
    timestamp: Scalars['BigInt'];
    transaction: Scalars['String'];
    trigger: ContractEvent;
  };

export type SharesAdditionFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  investor?: Maybe<Scalars['String']>;
  investor_not?: Maybe<Scalars['String']>;
  investor_gt?: Maybe<Scalars['String']>;
  investor_lt?: Maybe<Scalars['String']>;
  investor_gte?: Maybe<Scalars['String']>;
  investor_lte?: Maybe<Scalars['String']>;
  investor_in?: Maybe<Array<Scalars['String']>>;
  investor_not_in?: Maybe<Array<Scalars['String']>>;
  investor_contains?: Maybe<Scalars['String']>;
  investor_not_contains?: Maybe<Scalars['String']>;
  investor_starts_with?: Maybe<Scalars['String']>;
  investor_not_starts_with?: Maybe<Scalars['String']>;
  investor_ends_with?: Maybe<Scalars['String']>;
  investor_not_ends_with?: Maybe<Scalars['String']>;
  investment?: Maybe<Scalars['String']>;
  investment_not?: Maybe<Scalars['String']>;
  investment_gt?: Maybe<Scalars['String']>;
  investment_lt?: Maybe<Scalars['String']>;
  investment_gte?: Maybe<Scalars['String']>;
  investment_lte?: Maybe<Scalars['String']>;
  investment_in?: Maybe<Array<Scalars['String']>>;
  investment_not_in?: Maybe<Array<Scalars['String']>>;
  investment_contains?: Maybe<Scalars['String']>;
  investment_not_contains?: Maybe<Scalars['String']>;
  investment_starts_with?: Maybe<Scalars['String']>;
  investment_not_starts_with?: Maybe<Scalars['String']>;
  investment_ends_with?: Maybe<Scalars['String']>;
  investment_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  asset?: Maybe<Scalars['String']>;
  asset_not?: Maybe<Scalars['String']>;
  asset_gt?: Maybe<Scalars['String']>;
  asset_lt?: Maybe<Scalars['String']>;
  asset_gte?: Maybe<Scalars['String']>;
  asset_lte?: Maybe<Scalars['String']>;
  asset_in?: Maybe<Array<Scalars['String']>>;
  asset_not_in?: Maybe<Array<Scalars['String']>>;
  asset_contains?: Maybe<Scalars['String']>;
  asset_not_contains?: Maybe<Scalars['String']>;
  asset_starts_with?: Maybe<Scalars['String']>;
  asset_not_starts_with?: Maybe<Scalars['String']>;
  asset_ends_with?: Maybe<Scalars['String']>;
  asset_not_ends_with?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['BigDecimal']>;
  quantity_not?: Maybe<Scalars['BigDecimal']>;
  quantity_gt?: Maybe<Scalars['BigDecimal']>;
  quantity_lt?: Maybe<Scalars['BigDecimal']>;
  quantity_gte?: Maybe<Scalars['BigDecimal']>;
  quantity_lte?: Maybe<Scalars['BigDecimal']>;
  quantity_in?: Maybe<Array<Scalars['BigDecimal']>>;
  quantity_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SharesAdditionOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  INVESTOR = 'investor',
  INVESTMENT = 'investment',
  SHARES = 'shares',
  ASSET = 'asset',
  QUANTITY = 'quantity',
  TIMESTAMP = 'timestamp',
  TRANSACTION = 'transaction',
  TRIGGER = 'trigger',
}

export type SharesChange = {
  id: Scalars['ID'];
  kind: EventKindEnum;
  fund: Fund;
  version: Version;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['String'];
  trigger: ContractEvent;
  investment: Investment;
};

export type SharesChangeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
  investment?: Maybe<Scalars['String']>;
  investment_not?: Maybe<Scalars['String']>;
  investment_gt?: Maybe<Scalars['String']>;
  investment_lt?: Maybe<Scalars['String']>;
  investment_gte?: Maybe<Scalars['String']>;
  investment_lte?: Maybe<Scalars['String']>;
  investment_in?: Maybe<Array<Scalars['String']>>;
  investment_not_in?: Maybe<Array<Scalars['String']>>;
  investment_contains?: Maybe<Scalars['String']>;
  investment_not_contains?: Maybe<Scalars['String']>;
  investment_starts_with?: Maybe<Scalars['String']>;
  investment_not_starts_with?: Maybe<Scalars['String']>;
  investment_ends_with?: Maybe<Scalars['String']>;
  investment_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SharesChangeOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  TIMESTAMP = 'timestamp',
  TRANSACTION = 'transaction',
  TRIGGER = 'trigger',
  INVESTMENT = 'investment',
}

export type SharesRedemption = Event &
  SharesChange & {
    __typename?: 'SharesRedemption';
    id: Scalars['ID'];
    kind: EventKindEnum;
    fund: Fund;
    version: Version;
    investor: Account;
    investment: Investment;
    shares: Scalars['BigDecimal'];
    assets: Array<Asset>;
    quantities: Array<Scalars['BigDecimal']>;
    timestamp: Scalars['BigInt'];
    transaction: Scalars['String'];
    trigger: ContractEvent;
  };

export type SharesRedemptionAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetFilter>;
};

export type SharesRedemptionFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  investor?: Maybe<Scalars['String']>;
  investor_not?: Maybe<Scalars['String']>;
  investor_gt?: Maybe<Scalars['String']>;
  investor_lt?: Maybe<Scalars['String']>;
  investor_gte?: Maybe<Scalars['String']>;
  investor_lte?: Maybe<Scalars['String']>;
  investor_in?: Maybe<Array<Scalars['String']>>;
  investor_not_in?: Maybe<Array<Scalars['String']>>;
  investor_contains?: Maybe<Scalars['String']>;
  investor_not_contains?: Maybe<Scalars['String']>;
  investor_starts_with?: Maybe<Scalars['String']>;
  investor_not_starts_with?: Maybe<Scalars['String']>;
  investor_ends_with?: Maybe<Scalars['String']>;
  investor_not_ends_with?: Maybe<Scalars['String']>;
  investment?: Maybe<Scalars['String']>;
  investment_not?: Maybe<Scalars['String']>;
  investment_gt?: Maybe<Scalars['String']>;
  investment_lt?: Maybe<Scalars['String']>;
  investment_gte?: Maybe<Scalars['String']>;
  investment_lte?: Maybe<Scalars['String']>;
  investment_in?: Maybe<Array<Scalars['String']>>;
  investment_not_in?: Maybe<Array<Scalars['String']>>;
  investment_contains?: Maybe<Scalars['String']>;
  investment_not_contains?: Maybe<Scalars['String']>;
  investment_starts_with?: Maybe<Scalars['String']>;
  investment_not_starts_with?: Maybe<Scalars['String']>;
  investment_ends_with?: Maybe<Scalars['String']>;
  investment_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  assets?: Maybe<Array<Scalars['String']>>;
  assets_not?: Maybe<Array<Scalars['String']>>;
  assets_contains?: Maybe<Array<Scalars['String']>>;
  assets_not_contains?: Maybe<Array<Scalars['String']>>;
  quantities?: Maybe<Array<Scalars['BigDecimal']>>;
  quantities_not?: Maybe<Array<Scalars['BigDecimal']>>;
  quantities_contains?: Maybe<Array<Scalars['BigDecimal']>>;
  quantities_not_contains?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SharesRedemptionOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  INVESTOR = 'investor',
  INVESTMENT = 'investment',
  SHARES = 'shares',
  ASSETS = 'assets',
  QUANTITIES = 'quantities',
  TIMESTAMP = 'timestamp',
  TRANSACTION = 'transaction',
  TRIGGER = 'trigger',
}

export type SharesReward = Event &
  SharesChange & {
    __typename?: 'SharesReward';
    id: Scalars['ID'];
    kind: EventKindEnum;
    fund: Fund;
    version: Version;
    investor: Account;
    investment: Investment;
    shares: Scalars['BigDecimal'];
    timestamp: Scalars['BigInt'];
    transaction: Scalars['String'];
    trigger: ContractEvent;
  };

export type SharesRewardFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  investor?: Maybe<Scalars['String']>;
  investor_not?: Maybe<Scalars['String']>;
  investor_gt?: Maybe<Scalars['String']>;
  investor_lt?: Maybe<Scalars['String']>;
  investor_gte?: Maybe<Scalars['String']>;
  investor_lte?: Maybe<Scalars['String']>;
  investor_in?: Maybe<Array<Scalars['String']>>;
  investor_not_in?: Maybe<Array<Scalars['String']>>;
  investor_contains?: Maybe<Scalars['String']>;
  investor_not_contains?: Maybe<Scalars['String']>;
  investor_starts_with?: Maybe<Scalars['String']>;
  investor_not_starts_with?: Maybe<Scalars['String']>;
  investor_ends_with?: Maybe<Scalars['String']>;
  investor_not_ends_with?: Maybe<Scalars['String']>;
  investment?: Maybe<Scalars['String']>;
  investment_not?: Maybe<Scalars['String']>;
  investment_gt?: Maybe<Scalars['String']>;
  investment_lt?: Maybe<Scalars['String']>;
  investment_gte?: Maybe<Scalars['String']>;
  investment_lte?: Maybe<Scalars['String']>;
  investment_in?: Maybe<Array<Scalars['String']>>;
  investment_not_in?: Maybe<Array<Scalars['String']>>;
  investment_contains?: Maybe<Scalars['String']>;
  investment_not_contains?: Maybe<Scalars['String']>;
  investment_starts_with?: Maybe<Scalars['String']>;
  investment_not_starts_with?: Maybe<Scalars['String']>;
  investment_ends_with?: Maybe<Scalars['String']>;
  investment_not_ends_with?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['BigDecimal']>;
  shares_not?: Maybe<Scalars['BigDecimal']>;
  shares_gt?: Maybe<Scalars['BigDecimal']>;
  shares_lt?: Maybe<Scalars['BigDecimal']>;
  shares_gte?: Maybe<Scalars['BigDecimal']>;
  shares_lte?: Maybe<Scalars['BigDecimal']>;
  shares_in?: Maybe<Array<Scalars['BigDecimal']>>;
  shares_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
};

export enum SharesRewardOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  INVESTOR = 'investor',
  INVESTMENT = 'investment',
  SHARES = 'shares',
  TIMESTAMP = 'timestamp',
  TRANSACTION = 'transaction',
  TRIGGER = 'trigger',
}

export type State = Metric & {
  __typename?: 'State';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  shares: Share;
  portfolio: Portfolio;
  payouts: Payout;
  events: Array<Event>;
};

export type StateEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type StateFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shares?: Maybe<Scalars['String']>;
  shares_not?: Maybe<Scalars['String']>;
  shares_gt?: Maybe<Scalars['String']>;
  shares_lt?: Maybe<Scalars['String']>;
  shares_gte?: Maybe<Scalars['String']>;
  shares_lte?: Maybe<Scalars['String']>;
  shares_in?: Maybe<Array<Scalars['String']>>;
  shares_not_in?: Maybe<Array<Scalars['String']>>;
  shares_contains?: Maybe<Scalars['String']>;
  shares_not_contains?: Maybe<Scalars['String']>;
  shares_starts_with?: Maybe<Scalars['String']>;
  shares_not_starts_with?: Maybe<Scalars['String']>;
  shares_ends_with?: Maybe<Scalars['String']>;
  shares_not_ends_with?: Maybe<Scalars['String']>;
  portfolio?: Maybe<Scalars['String']>;
  portfolio_not?: Maybe<Scalars['String']>;
  portfolio_gt?: Maybe<Scalars['String']>;
  portfolio_lt?: Maybe<Scalars['String']>;
  portfolio_gte?: Maybe<Scalars['String']>;
  portfolio_lte?: Maybe<Scalars['String']>;
  portfolio_in?: Maybe<Array<Scalars['String']>>;
  portfolio_not_in?: Maybe<Array<Scalars['String']>>;
  portfolio_contains?: Maybe<Scalars['String']>;
  portfolio_not_contains?: Maybe<Scalars['String']>;
  portfolio_starts_with?: Maybe<Scalars['String']>;
  portfolio_not_starts_with?: Maybe<Scalars['String']>;
  portfolio_ends_with?: Maybe<Scalars['String']>;
  portfolio_not_ends_with?: Maybe<Scalars['String']>;
  payouts?: Maybe<Scalars['String']>;
  payouts_not?: Maybe<Scalars['String']>;
  payouts_gt?: Maybe<Scalars['String']>;
  payouts_lt?: Maybe<Scalars['String']>;
  payouts_gte?: Maybe<Scalars['String']>;
  payouts_lte?: Maybe<Scalars['String']>;
  payouts_in?: Maybe<Array<Scalars['String']>>;
  payouts_not_in?: Maybe<Array<Scalars['String']>>;
  payouts_contains?: Maybe<Scalars['String']>;
  payouts_not_contains?: Maybe<Scalars['String']>;
  payouts_starts_with?: Maybe<Scalars['String']>;
  payouts_not_starts_with?: Maybe<Scalars['String']>;
  payouts_ends_with?: Maybe<Scalars['String']>;
  payouts_not_ends_with?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Scalars['String']>>;
  events_not?: Maybe<Array<Scalars['String']>>;
  events_contains?: Maybe<Array<Scalars['String']>>;
  events_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum StateOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  SHARES = 'shares',
  PORTFOLIO = 'portfolio',
  PAYOUTS = 'payouts',
  EVENTS = 'events',
}

export type Subscription = {
  __typename?: 'Subscription';
  contractEvent?: Maybe<ContractEvent>;
  contractEvents: Array<ContractEvent>;
  version?: Maybe<Version>;
  versions: Array<Version>;
  share?: Maybe<Share>;
  shares: Array<Share>;
  holding?: Maybe<Holding>;
  holdings: Array<Holding>;
  portfolio?: Maybe<Portfolio>;
  portfolios: Array<Portfolio>;
  payout?: Maybe<Payout>;
  payouts: Array<Payout>;
  managementFeePayout?: Maybe<ManagementFeePayout>;
  managementFeePayouts: Array<ManagementFeePayout>;
  performanceFeePayout?: Maybe<PerformanceFeePayout>;
  performanceFeePayouts: Array<PerformanceFeePayout>;
  state?: Maybe<State>;
  states: Array<State>;
  fund?: Maybe<Fund>;
  funds: Array<Fund>;
  customFee?: Maybe<CustomFee>;
  customFees: Array<CustomFee>;
  performanceFee?: Maybe<PerformanceFee>;
  performanceFees: Array<PerformanceFee>;
  managementFee?: Maybe<ManagementFee>;
  managementFees: Array<ManagementFee>;
  customPolicy?: Maybe<CustomPolicy>;
  customPolicies: Array<CustomPolicy>;
  userWhitelistPolicy?: Maybe<UserWhitelistPolicy>;
  userWhitelistPolicies: Array<UserWhitelistPolicy>;
  priceTolerancePolicy?: Maybe<PriceTolerancePolicy>;
  priceTolerancePolicies: Array<PriceTolerancePolicy>;
  maxPositionsPolicy?: Maybe<MaxPositionsPolicy>;
  maxPositionsPolicies: Array<MaxPositionsPolicy>;
  maxConcentrationPolicy?: Maybe<MaxConcentrationPolicy>;
  maxConcentrationPolicies: Array<MaxConcentrationPolicy>;
  assetBlacklistPolicy?: Maybe<AssetBlacklistPolicy>;
  assetBlacklistPolicies: Array<AssetBlacklistPolicy>;
  assetWhitelistPolicy?: Maybe<AssetWhitelistPolicy>;
  assetWhitelistPolicies: Array<AssetWhitelistPolicy>;
  sharesAddition?: Maybe<SharesAddition>;
  sharesAdditions: Array<SharesAddition>;
  sharesRedemption?: Maybe<SharesRedemption>;
  sharesRedemptions: Array<SharesRedemption>;
  sharesReward?: Maybe<SharesReward>;
  sharesRewards: Array<SharesReward>;
  investmentRequest?: Maybe<InvestmentRequest>;
  investmentRequests: Array<InvestmentRequest>;
  investment?: Maybe<Investment>;
  investments: Array<Investment>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  asset?: Maybe<Asset>;
  assets: Array<Asset>;
  trade?: Maybe<Trade>;
  trades: Array<Trade>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  event?: Maybe<Event>;
  events: Array<Event>;
  metric?: Maybe<Metric>;
  metrics: Array<Metric>;
  individualPayout?: Maybe<IndividualPayout>;
  individualPayouts: Array<IndividualPayout>;
  fee?: Maybe<Fee>;
  fees: Array<Fee>;
  policy?: Maybe<Policy>;
  policies: Array<Policy>;
  sharesChange?: Maybe<SharesChange>;
  sharesChanges: Array<SharesChange>;
};

export type SubscriptionContractEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionContractEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ContractEventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ContractEventFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionVersionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionVersionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<VersionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<VersionFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionShareArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ShareOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ShareFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionHoldingArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionHoldingsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<HoldingOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<HoldingFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPortfolioArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPortfoliosArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PortfolioOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PortfolioFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionManagementFeePayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionManagementFeePayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ManagementFeePayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ManagementFeePayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPerformanceFeePayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPerformanceFeePayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PerformanceFeePayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PerformanceFeePayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionStateArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionStatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StateOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<StateFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionFundArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionFundsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FundOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FundFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionCustomFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionCustomFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CustomFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CustomFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPerformanceFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPerformanceFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PerformanceFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PerformanceFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionManagementFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionManagementFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ManagementFeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ManagementFeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionCustomPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionCustomPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CustomPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CustomPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionUserWhitelistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionUserWhitelistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserWhitelistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<UserWhitelistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPriceTolerancePolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPriceTolerancePoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PriceTolerancePolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PriceTolerancePolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMaxPositionsPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMaxPositionsPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaxPositionsPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MaxPositionsPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMaxConcentrationPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMaxConcentrationPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MaxConcentrationPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MaxConcentrationPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetBlacklistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetBlacklistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetBlacklistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetBlacklistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetWhitelistPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetWhitelistPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetWhitelistPolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetWhitelistPolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesAdditionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesAdditionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesAdditionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesAdditionFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesRedemptionArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesRedemptionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesRedemptionOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesRedemptionFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesRewardArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesRewardsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesRewardOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesRewardFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionInvestmentRequestArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionInvestmentRequestsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentRequestOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentRequestFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionInvestmentArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionInvestmentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<InvestmentOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<InvestmentFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAccountArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAccountsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AccountOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AccountFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionTradeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionTradesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<TradeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<TradeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionExchangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionEventArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMetricArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionMetricsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MetricOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MetricFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionIndividualPayoutArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionIndividualPayoutsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IndividualPayoutOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<IndividualPayoutFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionFeeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionFeesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FeeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FeeFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPolicyArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionPoliciesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PolicyOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PolicyFilter>;
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesChangeArgs = {
  id: Scalars['ID'];
  block?: Maybe<BlockHeight>;
};

export type SubscriptionSharesChangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SharesChangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<SharesChangeFilter>;
  block?: Maybe<BlockHeight>;
};

export type Trade = Event & {
  __typename?: 'Trade';
  id: Scalars['ID'];
  kind: EventKindEnum;
  fund: Fund;
  version: Version;
  exchange: Exchange;
  timestamp: Scalars['BigInt'];
  methodName: Scalars['String'];
  assetSold: Asset;
  assetBought: Asset;
  amountSold: Scalars['BigDecimal'];
  amountBought: Scalars['BigDecimal'];
  transaction: Scalars['String'];
  trigger: ContractEvent;
};

export type TradeFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  kind?: Maybe<EventKindEnum>;
  kind_not?: Maybe<EventKindEnum>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  version_not?: Maybe<Scalars['String']>;
  version_gt?: Maybe<Scalars['String']>;
  version_lt?: Maybe<Scalars['String']>;
  version_gte?: Maybe<Scalars['String']>;
  version_lte?: Maybe<Scalars['String']>;
  version_in?: Maybe<Array<Scalars['String']>>;
  version_not_in?: Maybe<Array<Scalars['String']>>;
  version_contains?: Maybe<Scalars['String']>;
  version_not_contains?: Maybe<Scalars['String']>;
  version_starts_with?: Maybe<Scalars['String']>;
  version_not_starts_with?: Maybe<Scalars['String']>;
  version_ends_with?: Maybe<Scalars['String']>;
  version_not_ends_with?: Maybe<Scalars['String']>;
  exchange?: Maybe<Scalars['String']>;
  exchange_not?: Maybe<Scalars['String']>;
  exchange_gt?: Maybe<Scalars['String']>;
  exchange_lt?: Maybe<Scalars['String']>;
  exchange_gte?: Maybe<Scalars['String']>;
  exchange_lte?: Maybe<Scalars['String']>;
  exchange_in?: Maybe<Array<Scalars['String']>>;
  exchange_not_in?: Maybe<Array<Scalars['String']>>;
  exchange_contains?: Maybe<Scalars['String']>;
  exchange_not_contains?: Maybe<Scalars['String']>;
  exchange_starts_with?: Maybe<Scalars['String']>;
  exchange_not_starts_with?: Maybe<Scalars['String']>;
  exchange_ends_with?: Maybe<Scalars['String']>;
  exchange_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  methodName?: Maybe<Scalars['String']>;
  methodName_not?: Maybe<Scalars['String']>;
  methodName_gt?: Maybe<Scalars['String']>;
  methodName_lt?: Maybe<Scalars['String']>;
  methodName_gte?: Maybe<Scalars['String']>;
  methodName_lte?: Maybe<Scalars['String']>;
  methodName_in?: Maybe<Array<Scalars['String']>>;
  methodName_not_in?: Maybe<Array<Scalars['String']>>;
  methodName_contains?: Maybe<Scalars['String']>;
  methodName_not_contains?: Maybe<Scalars['String']>;
  methodName_starts_with?: Maybe<Scalars['String']>;
  methodName_not_starts_with?: Maybe<Scalars['String']>;
  methodName_ends_with?: Maybe<Scalars['String']>;
  methodName_not_ends_with?: Maybe<Scalars['String']>;
  assetSold?: Maybe<Scalars['String']>;
  assetSold_not?: Maybe<Scalars['String']>;
  assetSold_gt?: Maybe<Scalars['String']>;
  assetSold_lt?: Maybe<Scalars['String']>;
  assetSold_gte?: Maybe<Scalars['String']>;
  assetSold_lte?: Maybe<Scalars['String']>;
  assetSold_in?: Maybe<Array<Scalars['String']>>;
  assetSold_not_in?: Maybe<Array<Scalars['String']>>;
  assetSold_contains?: Maybe<Scalars['String']>;
  assetSold_not_contains?: Maybe<Scalars['String']>;
  assetSold_starts_with?: Maybe<Scalars['String']>;
  assetSold_not_starts_with?: Maybe<Scalars['String']>;
  assetSold_ends_with?: Maybe<Scalars['String']>;
  assetSold_not_ends_with?: Maybe<Scalars['String']>;
  assetBought?: Maybe<Scalars['String']>;
  assetBought_not?: Maybe<Scalars['String']>;
  assetBought_gt?: Maybe<Scalars['String']>;
  assetBought_lt?: Maybe<Scalars['String']>;
  assetBought_gte?: Maybe<Scalars['String']>;
  assetBought_lte?: Maybe<Scalars['String']>;
  assetBought_in?: Maybe<Array<Scalars['String']>>;
  assetBought_not_in?: Maybe<Array<Scalars['String']>>;
  assetBought_contains?: Maybe<Scalars['String']>;
  assetBought_not_contains?: Maybe<Scalars['String']>;
  assetBought_starts_with?: Maybe<Scalars['String']>;
  assetBought_not_starts_with?: Maybe<Scalars['String']>;
  assetBought_ends_with?: Maybe<Scalars['String']>;
  assetBought_not_ends_with?: Maybe<Scalars['String']>;
  amountSold?: Maybe<Scalars['BigDecimal']>;
  amountSold_not?: Maybe<Scalars['BigDecimal']>;
  amountSold_gt?: Maybe<Scalars['BigDecimal']>;
  amountSold_lt?: Maybe<Scalars['BigDecimal']>;
  amountSold_gte?: Maybe<Scalars['BigDecimal']>;
  amountSold_lte?: Maybe<Scalars['BigDecimal']>;
  amountSold_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountSold_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountBought?: Maybe<Scalars['BigDecimal']>;
  amountBought_not?: Maybe<Scalars['BigDecimal']>;
  amountBought_gt?: Maybe<Scalars['BigDecimal']>;
  amountBought_lt?: Maybe<Scalars['BigDecimal']>;
  amountBought_gte?: Maybe<Scalars['BigDecimal']>;
  amountBought_lte?: Maybe<Scalars['BigDecimal']>;
  amountBought_in?: Maybe<Array<Scalars['BigDecimal']>>;
  amountBought_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  trigger_not?: Maybe<Scalars['String']>;
  trigger_gt?: Maybe<Scalars['String']>;
  trigger_lt?: Maybe<Scalars['String']>;
  trigger_gte?: Maybe<Scalars['String']>;
  trigger_lte?: Maybe<Scalars['String']>;
  trigger_in?: Maybe<Array<Scalars['String']>>;
  trigger_not_in?: Maybe<Array<Scalars['String']>>;
  trigger_contains?: Maybe<Scalars['String']>;
  trigger_not_contains?: Maybe<Scalars['String']>;
  trigger_starts_with?: Maybe<Scalars['String']>;
  trigger_not_starts_with?: Maybe<Scalars['String']>;
  trigger_ends_with?: Maybe<Scalars['String']>;
  trigger_not_ends_with?: Maybe<Scalars['String']>;
};

export enum TradeOrderBy {
  ID = 'id',
  KIND = 'kind',
  FUND = 'fund',
  VERSION = 'version',
  EXCHANGE = 'exchange',
  TIMESTAMP = 'timestamp',
  METHODNAME = 'methodName',
  ASSETSOLD = 'assetSold',
  ASSETBOUGHT = 'assetBought',
  AMOUNTSOLD = 'amountSold',
  AMOUNTBOUGHT = 'amountBought',
  TRANSACTION = 'transaction',
  TRIGGER = 'trigger',
}

export type UserWhitelistPolicy = Policy & {
  __typename?: 'UserWhitelistPolicy';
  id: Scalars['ID'];
  fund: Fund;
  timestamp: Scalars['BigInt'];
  identifier: PolicyIdentifierEnum;
};

export type UserWhitelistPolicyFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  fund?: Maybe<Scalars['String']>;
  fund_not?: Maybe<Scalars['String']>;
  fund_gt?: Maybe<Scalars['String']>;
  fund_lt?: Maybe<Scalars['String']>;
  fund_gte?: Maybe<Scalars['String']>;
  fund_lte?: Maybe<Scalars['String']>;
  fund_in?: Maybe<Array<Scalars['String']>>;
  fund_not_in?: Maybe<Array<Scalars['String']>>;
  fund_contains?: Maybe<Scalars['String']>;
  fund_not_contains?: Maybe<Scalars['String']>;
  fund_starts_with?: Maybe<Scalars['String']>;
  fund_not_starts_with?: Maybe<Scalars['String']>;
  fund_ends_with?: Maybe<Scalars['String']>;
  fund_not_ends_with?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  identifier?: Maybe<PolicyIdentifierEnum>;
  identifier_not?: Maybe<PolicyIdentifierEnum>;
};

export enum UserWhitelistPolicyOrderBy {
  ID = 'id',
  FUND = 'fund',
  TIMESTAMP = 'timestamp',
  IDENTIFIER = 'identifier',
}

export type Version = {
  __typename?: 'Version';
  id: Scalars['ID'];
  name: Scalars['String'];
  funds: Array<Fund>;
  events: Array<Event>;
  assets: Array<Asset>;
  exchanges: Array<Exchange>;
};

export type VersionFundsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<FundOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<FundFilter>;
};

export type VersionEventsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<EventOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<EventFilter>;
};

export type VersionAssetsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<AssetOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<AssetFilter>;
};

export type VersionExchangesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<ExchangeOrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<ExchangeFilter>;
};

export type VersionFilter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_gt?: Maybe<Scalars['String']>;
  name_lt?: Maybe<Scalars['String']>;
  name_gte?: Maybe<Scalars['String']>;
  name_lte?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Scalars['String']>>;
  name_not_in?: Maybe<Array<Scalars['String']>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_starts_with?: Maybe<Scalars['String']>;
  name_not_starts_with?: Maybe<Scalars['String']>;
  name_ends_with?: Maybe<Scalars['String']>;
  name_not_ends_with?: Maybe<Scalars['String']>;
  assets?: Maybe<Array<Scalars['String']>>;
  assets_not?: Maybe<Array<Scalars['String']>>;
  assets_contains?: Maybe<Array<Scalars['String']>>;
  assets_not_contains?: Maybe<Array<Scalars['String']>>;
  exchanges?: Maybe<Array<Scalars['String']>>;
  exchanges_not?: Maybe<Array<Scalars['String']>>;
  exchanges_contains?: Maybe<Array<Scalars['String']>>;
  exchanges_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum VersionOrderBy {
  ID = 'id',
  NAME = 'name',
  FUNDS = 'funds',
  EVENTS = 'events',
  ASSETS = 'assets',
  EXCHANGES = 'exchanges',
}
