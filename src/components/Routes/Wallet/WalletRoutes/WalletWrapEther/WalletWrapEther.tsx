import React, { useContext } from 'react';
import * as Yup from 'yup';
import BigNumber from 'bignumber.js';
import useForm from 'react-hook-form';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { NormalizedCache } from 'apollo-cache-inmemory';
import { OnChainContext } from '~/components/Contexts/Connection';
import { Weth } from '@melonproject/melonjs';
import { findToken } from '~/graphql/utils/findToken';
import { toWei } from 'web3-utils';

interface WrapEtherValidationBalanceQueryResult {
  account?: {
    balance: BigNumber;
  };
}

const validationSchema = Yup.object().shape({
  // tslint:disable-next-line
  quantity: Yup.mixed<BigNumber>().test('can-afford', 'You do not have enough ether.', async function(value) {
    const client: ApolloClient<NormalizedCache> = this.options.context as any;
    const result = await client.query<WrapEtherValidationBalanceQueryResult>({
      query: gql`
        query WrapEtherValidationBalanceQuery {
          account {
            balance(token: ETH)
          }
        }
      `,
    });

    if (!result.data.account || result.data.account.balance.isLessThan(value)) {
      return false;
    }

    return true;
  }),
});

const defaultValues = {
  quantity: 0.5,
};

interface WalletWrapEtherFormValues {
  quantity: number;
}

export const WalletWrapEther: React.FC = () => {
  const chain = useContext(OnChainContext);
  const form = useForm<WalletWrapEtherFormValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    validationSchemaOption: {
      context: chain.client,
    },
  });

  const submit = form.handleSubmit(async data => {
    const token = findToken(process.env.DEPLOYMENT, 'WETH');
    const account = chain.connection.accounts && chain.connection.accounts[0];
    const weth = new Weth(chain.environment, token.address);
    const transaction = weth.deposit(new BigNumber(toWei(`${data.quantity}`)), account!);
    const estimate = await transaction.estimate();
    const result = await transaction.send(estimate).on('transactionHash', hash => {
      console.log(hash);
    });

    console.log(result);
  });

  return (
    <form onSubmit={submit}>
      <div>
        {form.errors.quantity && <div>{form.errors.quantity.message}</div>}
        <input type="number" step="any" name="quantity" ref={form.register} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WalletWrapEther;
