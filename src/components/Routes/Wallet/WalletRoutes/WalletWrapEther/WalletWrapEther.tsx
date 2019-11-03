import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import BigNumber from 'bignumber.js';
import useForm, { FormContext } from 'react-hook-form';
import { toWei } from 'web3-utils';
import { Weth } from '@melonproject/melonjs';
import { findToken } from '~/utils/findToken';
import { useTransaction, TransactionProgress } from '~/hooks/useTransaction';
import { OnChainContext } from '~/components/Contexts/Connection';
import { TransactionModal } from '~/components/Common/TransactionModal/TransactionModal';
import { refetchQueries } from '~/utils/refetchQueries';

const validationSchema = Yup.object().shape({
  quantity: Yup.mixed<number>(),
});

const defaultValues = {
  quantity: '0.5',
};

export const WalletWrapEther: React.FC = () => {
  const chain = useContext(OnChainContext);
  const transaction = useTransaction(chain.environment!, {
    onFinish: () => refetchQueries(chain.client, ['AccountBalancesQuery', 'ConnectionQuery']),
  });

  const form = useForm<typeof defaultValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const submit = form.handleSubmit(async data => {
    const token = findToken(process.env.PROTOCOL_DEPLOYMENT, 'WETH');
    const weth = new Weth(chain.environment!, token.address);
    const tx = weth.deposit(new BigNumber(toWei(data.quantity)), chain.environment!.account!);
    transaction.start(tx);
  });

  return (
    <div>
      <FormContext {...form}>
        <form onSubmit={submit}>
          <div>
            {form.errors.quantity && <div>{form.errors.quantity.message}</div>}
            <input type="number" step="any" name="quantity" ref={form.register} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </FormContext>

      <FormContext {...transaction.form}>
        <TransactionModal transaction={transaction} />
      </FormContext>
    </div>
  );
};

export default WalletWrapEther;
