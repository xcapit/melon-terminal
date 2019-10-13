import { NetworkEnum } from '~/types';

export const networkFromId = (id: number) => {
  switch (id) {
    case 1:
      return NetworkEnum.MAINNET;
    case 42:
      return NetworkEnum.KOVAN;
  }

  return undefined;
};
