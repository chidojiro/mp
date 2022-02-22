import { Action } from './Action';
import { StepDelivery } from './StepDelivery';

export type MarketingAction = {
  id?: string;
  name: string;
  icon?: string;
};

type Props = {
  marketingAction?: MarketingAction;
  children?: React.ReactNode;
};

export const MarketingAction = ({ marketingAction, children }: Props) => {
  return (
    <div className='h-full border rounded-lg border-gray'>
      <Action />
      <StepDelivery />
    </div>
  );
};
