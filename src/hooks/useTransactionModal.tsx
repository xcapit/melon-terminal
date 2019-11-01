import React, { useEffect, useReducer } from 'react';
import * as Yup from 'yup';
import { Environment } from '~/Environment';
import { TransactionReceipt } from 'web3-core';
import { Transaction } from '@melonproject/melonjs';
import useForm from 'react-hook-form';
import Modal from 'styled-react-modal';
import { Spinner } from '~/components/Common/Spinner/Spinner';

interface ModalFormValues {
  gasLimit: string;
  gasPrice: string;
}

interface State {
  state: string;
  gasLimit?: number;
  gasPrice?: string;
  transaction?: Transaction;
  hash?: string;
  receipt?: TransactionReceipt;
  error?: string;
  loading: boolean;
}

enum ActionType {
  TRANSACTION_INIT,
  TRANSACTION_CANCELLED,
  ESTIMATION_PENDING,
  ESTIMATION_FINISHED,
  ESTIMATION_ERROR,
  EXECUTION_PENDING,
  EXECUTION_RECEIVED,
  EXECUTION_FINISHED,
  EXECUTION_ERROR,
}

type Action =
  | TransactionInitialized
  | TransactionCancelled
  | EstimationPending
  | EstimationFinished
  | EstimationError
  | ExecutionPending
  | ExecutionReceived
  | ExecutionFinished
  | ExecutionError;

interface TransactionInitialized {
  type: ActionType.TRANSACTION_INIT;
  transaction: Transaction;
}

interface TransactionCancelled {
  type: ActionType.TRANSACTION_CANCELLED;
}

interface EstimationPending {
  type: ActionType.ESTIMATION_PENDING;
}

interface EstimationFinished {
  type: ActionType.ESTIMATION_FINISHED;
  limit: number;
  price: string;
}

interface EstimationError {
  type: ActionType.ESTIMATION_ERROR;
  error: string;
}

interface ExecutionPending {
  type: ActionType.EXECUTION_PENDING;
}

interface ExecutionReceived {
  type: ActionType.EXECUTION_RECEIVED;
  hash: string;
}

interface ExecutionFinished {
  type: ActionType.EXECUTION_FINISHED;
  receipt: TransactionReceipt;
}

interface ExecutionError {
  type: ActionType.EXECUTION_ERROR;
  error: string;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.TRANSACTION_INIT:
      return {
        ...state,
        state: 'INIT',
        transaction: action.transaction,
        error: undefined,
        hash: undefined,
        receipt: undefined,
        gasPrice: undefined,
        gasLimit: undefined,
        loading: true,
      };

    case ActionType.TRANSACTION_CANCELLED:
      return {
        ...state,
        state: 'CANCELLED',
        transaction: undefined,
        error: undefined,
        hash: undefined,
        receipt: undefined,
        gasPrice: undefined,
        gasLimit: undefined,
        loading: false,
      };

    case ActionType.ESTIMATION_PENDING: {
      return {
        ...state,
        state: 'ESTIMATION_PENDING',
        loading: true,
        error: undefined,
      };
    }

    case ActionType.ESTIMATION_ERROR: {
      return {
        ...state,
        state: 'ESTIMATION_ERROR',
        loading: false,
        error: action.error,
      };
    }

    case ActionType.ESTIMATION_FINISHED:
      return {
        ...state,
        state: 'ESTIMATION_FINISHED',
        loading: false,
        gasPrice: action.price,
        gasLimit: action.limit,
      };

    case ActionType.EXECUTION_PENDING: {
      return {
        ...state,
        state: 'TRANSACTION_PENDING',
        loading: true,
        error: undefined,
        hash: undefined,
      };
    }

    case ActionType.EXECUTION_RECEIVED: {
      return {
        ...state,
        state: 'TRANSACTION_RECEIVED',
        hash: action.hash,
      };
    }

    case ActionType.EXECUTION_FINISHED: {
      return {
        ...state,
        state: 'TRANSACTION_FINISHED',
        loading: false,
        receipt: action.receipt,
      };
    }

    case ActionType.EXECUTION_ERROR: {
      return {
        ...state,
        state: 'TRANSACTION_ERROR',
        loading: false,
        error: action.error,
      };
    }

    default:
      throw new Error('Invalid action.');
  }
}

function estimationPending(dispatch: React.Dispatch<Action>) {
  dispatch({ type: ActionType.ESTIMATION_PENDING });
}

function estimationFinished(dispatch: React.Dispatch<Action>, price: string, limit: number) {
  dispatch({ limit, price, type: ActionType.ESTIMATION_FINISHED });
}

function estimationError(dispatch: React.Dispatch<Action>, error: string) {
  dispatch({ error, type: ActionType.ESTIMATION_ERROR });
}

function executionPending(dispatch: React.Dispatch<Action>) {
  dispatch({ type: ActionType.EXECUTION_PENDING });
}

function executionReceived(dispatch: React.Dispatch<Action>, hash: string) {
  dispatch({ hash, type: ActionType.EXECUTION_RECEIVED });
}

function executionFinished(dispatch: React.Dispatch<Action>, receipt: TransactionReceipt) {
  dispatch({ receipt, type: ActionType.EXECUTION_FINISHED });
}

function executionError(dispatch: React.Dispatch<Action>, error: string) {
  dispatch({ error, type: ActionType.EXECUTION_ERROR });
}

export function useTransactionModal(environment: Environment) {
  const [state, dispatch] = useReducer(reducer, {
    state: 'START',
    transaction: undefined,
    hash: undefined,
    receipt: undefined,
    error: undefined,
    loading: false,
  } as State);

  const form = useForm<ModalFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    validationSchema: Yup.object().shape({
      gasLimit: Yup.number(),
      gasPrice: Yup.number(),
    }),
  });

  const submit = form.handleSubmit(async data => {
    if (!state.transaction) {
      return;
    }

    try {
      executionPending(dispatch);
      const transaction = state.transaction!;
      const options = {
        gas: parseFloat(data.gasLimit),
        gasPrice: data.gasPrice,
      };

      const receipt = await transaction.send(options).on('transactionHash', hash => executionReceived(dispatch, hash));
      executionFinished(dispatch, receipt);
    } catch (error) {
      executionError(dispatch, error.message);
    }
  });

  useEffect(() => {
    if (!state.transaction) {
      return;
    }

    (async () => {
      try {
        estimationPending(dispatch);

        const [price, limit] = await Promise.all([
          await environment.client.getGasPrice(),
          await state.transaction!.estimate(),
        ]);

        estimationFinished(dispatch, price, limit);
      } catch (error) {
        estimationError(dispatch, error.message);
      }
    })();
  }, [state.transaction]);

  useEffect(() => {
    form.setValue('gasLimit', `${state.gasLimit || ''}`);
    form.setValue('gasPrice', `${state.gasPrice || ''}`);
  }, [state.gasLimit, state.gasPrice]);

  const startTransaction = (transaction: Transaction) => {
    dispatch({ transaction, type: ActionType.TRANSACTION_INIT });
  };

  const cancelTransaction = () => {
    dispatch({ type: ActionType.TRANSACTION_CANCELLED });
  };

  const renderModal = (
    <Modal isOpen={!!state.transaction}>
      <form onSubmit={submit}>
        {state.loading && <Spinner />}
        {state.state && <div>Transaction state: {state.state}</div>}
        {state.error && <div>Error: {state.error}</div>}
        {state.hash && <div>Hash: {state.hash}</div>}
        {state.receipt && <div>Receipt: {state.receipt.transactionHash}</div>}
        <div>
          {form.errors.gas && <div>{form.errors.gas.message}</div>}
          <div>
            <label htmlFor="gas-price">Gas price</label>
            <input type="number" step="any" name="gasPrice" ref={form.register} disabled={state.loading} />
          </div>
          <div>
            <label htmlFor="gas-price">Gas limit</label>
            <input type="number" step="any" name="gasLimit" ref={form.register} disabled={state.loading} />
          </div>
        </div>
        <button type="submit">{state.error ? 'Retry' : 'Submit'}</button>
        <button type="button" onClick={() => cancelTransaction()}>
          Cancel
        </button>
      </form>
    </Modal>
  );

  return [startTransaction, renderModal] as [typeof startTransaction, typeof renderModal];
}
