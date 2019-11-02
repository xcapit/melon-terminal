import React from 'react';
import Modal from 'styled-react-modal';
import { TransactionHookValues, TransactionProgress } from '~/hooks/useTransaction';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { ProgressBar } from '~/components/Common/ProgressBar/ProgressBar';

function progressToPercentage(progress?: TransactionProgress) {
  if (progress && progress < TransactionProgress.ESTIMATION_FINISHED) {
    return 0;
  }

  if (progress && progress < TransactionProgress.EXECUTION_PENDING) {
    return 25;
  }

  if (progress && progress < TransactionProgress.EXECUTION_RECEIVED) {
    return 50;
  }

  if (progress && progress < TransactionProgress.EXECUTION_FINISHED) {
    return 75;
  }

  if (progress && progress === TransactionProgress.EXECUTION_FINISHED) {
    return 100;
  }

  return 0;
}

export interface TransactionModalProps {
  transaction: TransactionHookValues;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction: { state, form, cancel, submit, acknowledge },
}) => {
  const finished = state.progress >= TransactionProgress.EXECUTION_FINISHED;
  const open =
    state.progress < TransactionProgress.TRANSACTION_ACKNOWLEDGED &&
    state.progress > TransactionProgress.TRANSACTION_STARTED;

  return (
    <Modal isOpen={open}>
      <div>
        <div>
          {state.loading && <Spinner />}

          {!finished && (
            <form onSubmit={submit}>
              {form.errors.gas && <div>{form.errors.gas.message}</div>}
              <div>
                <label htmlFor="gas-price">Gas price</label>
                <input
                  id="gas-price"
                  type="number"
                  step="any"
                  name="gasPrice"
                  ref={form.register}
                  disabled={state.loading}
                />
              </div>
              <div>
                <label htmlFor="gas-limit">Gas limit</label>
                <input
                  id="gas-limit"
                  type="number"
                  step="any"
                  name="gasLimit"
                  ref={form.register}
                  disabled={state.loading}
                />
              </div>
              <button type="submit" disabled={state.loading}>
                {state.error ? 'Retry' : 'Submit'}
              </button>
              <button type="button" disabled={state.loading} onClick={() => cancel()}>
                Cancel
              </button>
            </form>
          )}

          <div>
            <ProgressBar progress={progressToPercentage(state.progress)} />
            {state.progress && <div>State: {state.progress}</div>}
            {state.hash && <div>Hash: {state.hash}</div>}
            {state.error && <div>Error: {state.error}</div>}
            {state.receipt && <div>Block number: {state.receipt.blockNumber}</div>}
            {state.receipt && <div>Gas used: {state.receipt.gasUsed}</div>}
            {state.receipt && <div>Cummulative gas used: {state.receipt.cumulativeGasUsed}</div>}
          </div>

          {finished && (
            <button type="button" onClick={() => acknowledge()}>
              Close
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
