import React, { useContext } from 'react';
import * as Yup from 'yup';
import BigNumber from 'bignumber.js';
import useForm from 'react-hook-form';
import { toWei } from 'web3-utils';
import { Weth } from '@melonproject/melonjs';
import { OnChainContext } from '~/components/Contexts/Connection';
import { findToken } from '~/utils/findToken';
import { useTransactionModal } from '~/hooks/useTransactionModal';

const validationSchema = Yup.object().shape({
  quantity: Yup.mixed<number>(),
});

const defaultValues = {
  quantity: '0.5',
};

export const WalletUnwrapEther: React.FC = () => {
  const chain = useContext(OnChainContext);
  const form = useForm<typeof defaultValues>({
    defaultValues,
    validationSchema,
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  });

  const [open, modal] = useTransactionModal(chain.environment!);
  const submit = form.handleSubmit(async data => {
    const token = findToken(process.env.PROTOCOL_DEPLOYMENT, 'WETH');
    const weth = new Weth(chain.environment!, token.address);
    const transaction = weth.withdraw(new BigNumber(toWei(data.quantity)), chain.environment!.account!);
    open(transaction);
  });

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          {form.errors.quantity && <div>{form.errors.quantity.message}</div>}
          <input type="number" step="any" name="quantity" ref={form.register} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {modal}
    </div>
  );
};

export default WalletUnwrapEther;
