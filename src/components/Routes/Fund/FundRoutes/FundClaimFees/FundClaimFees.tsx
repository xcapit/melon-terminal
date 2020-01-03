import React, { FormEvent } from 'react';
import * as S from './FundClaimFees.styles';
import { useEnvironment } from '~/hooks/useEnvironment';
import { useTransaction } from '~/hooks/useTransaction';
import { useHistory } from 'react-router';
import { ButtonBlock } from '~/components/Common/Form/ButtonBlock/ButtonBlock';
import { Accounting, FeeManager } from '@melonproject/melonjs';
import { SubmitButton } from '~/components/Common/Form/SubmitButton/SubmitButton';
import { TransactionModal } from '~/components/Common/TransactionModal/TransactionModal';
import { useFundDetailsQuery } from '~/queries/FundDetails';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { useAccount } from '~/hooks/useAccount';
import { useOnChainQueryRefetcher } from '~/hooks/useOnChainQueryRefetcher';

export interface ClaimFeesProps {
  address: string;
}

export const ClaimFees: React.FC<ClaimFeesProps> = ({ address }) => {
  const environment = useEnvironment()!;
  const account = useAccount();
  const refetch = useOnChainQueryRefetcher();
  const [details, _, query] = useFundDetailsQuery(address);

  const history = useHistory();

  const accountingAddress = details && details.routes && details.routes.accounting && details.routes.accounting.address;
  const accounting = new Accounting(environment, accountingAddress);

  const feeManagerInfo = details && details.routes && details.routes.feeManager;
  const feeManagerAddress = feeManagerInfo && feeManagerInfo.address;
  const feeManager = new FeeManager(environment, feeManagerAddress);

  const transaction = useTransaction(environment, {
    onFinish: () => refetch(),
    onAcknowledge: () => {
      history.push(`/fund/${address}`);
    },
  });

  const submitAllFees = () => {
    const tx = accounting.triggerRewardAllFees(account.address!);
    transaction.start(tx, 'Claim all fees');
  };

  const submitManagementFees = () => {
    const tx = feeManager.rewardManagementFee(account.address!);
    transaction.start(tx, 'Claim management fee');
  };

  if (query.loading) {
    return (
      <S.FundClaimFeesBody>
        <Spinner />
      </S.FundClaimFeesBody>
    );
  }

  return (
    <S.FundClaimFeesBody>
      <h1>Claim fees</h1>
      <p>Claim management fees and performance fees for the fund.</p>
      <p>Accrued management fee: {feeManagerInfo && feeManagerInfo.managementFeeAmount.dividedBy('1e18').toFixed(6)}</p>
      <p>
        Accrued performance fee: {feeManagerInfo && feeManagerInfo.performanceFeeAmount.dividedBy('1e18').toFixed(6)}
      </p>
      <p>
        Payout of performance fee possible:{' '}
        {feeManagerInfo && feeManagerInfo.performanceFee && feeManagerInfo.performanceFee.canUpdate}
      </p>

      <ButtonBlock>
        <SubmitButton type="button" label="Claim all fees" onClick={() => submitAllFees()} />
        <SubmitButton type="button" label="Claim management fees" onClick={() => submitManagementFees()} />
      </ButtonBlock>

      <TransactionModal transaction={transaction} />
    </S.FundClaimFeesBody>
  );
};

export default ClaimFees;
