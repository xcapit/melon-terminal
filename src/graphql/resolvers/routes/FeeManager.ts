import { Resolver } from '~/graphql';
import { FeeManager, PerformanceFee, ManagementFee } from '@melonproject/melonjs';

export const id: Resolver<FeeManager> = manager => manager.contract.address;
export const address: Resolver<FeeManager> = manager => manager.contract.address;

export const performanceFee: Resolver<FeeManager> = async (manager, _, context) => {
  const address = await manager.getPerformanceFeeAddress(context.block);
  const performance = new PerformanceFee(context.environment, address);
  return [manager, performance];
};

export const managementFee: Resolver<FeeManager> = async (manager, _, context) => {
  const address = await manager.getManagementFeeAddress(context.block);
  const management = new ManagementFee(context.environment, address);
  return [manager, management];
};
