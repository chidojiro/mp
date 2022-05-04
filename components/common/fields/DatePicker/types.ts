import { HTMLDivProps } from '@/types';

export type Props = Omit<HTMLDivProps, 'onChange' | 'ref' | 'css'> & {
  ref?: React.Ref<HTMLInputElement>;
  value?: Date | Date[];
  onChange?: (value: Date) => void;
  max?: Date;
  min?: Date;
  name?: string;
  error?: boolean;
  range?: boolean;
};
