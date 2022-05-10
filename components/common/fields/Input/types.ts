import { HTMLInputProps } from '@/types';

export type BaseInputProps = Omit<HTMLInputProps, 'ref' | 'type'> & {
  ref?: React.Ref<HTMLInputElement>;
};

type InputType = 'email' | 'file' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'time';

export type InputProps = BaseInputProps & {
  label?: React.ReactNode;
  error?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  innerLeft?: React.ReactNode;
  innerRight?: React.ReactNode;
  type?: InputType;
  trimOnBlur?: boolean;
  allowNegative?: boolean;
  onEnterPress?: () => void;
  pattern?: string;
  pad?: number;
};
