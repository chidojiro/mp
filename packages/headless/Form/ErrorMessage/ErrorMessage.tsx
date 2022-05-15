import React from 'react';
import { get } from 'lodash-es';
import { useFormContext } from 'react-hook-form';

export type Props = {
  name: string | string[];
  className?: string;
  children: (message: string) => React.ReactNode;
};

export const ErrorMessage = ({ name, children }: Props) => {
  const {
    formState: { errors },
  } = useFormContext();

  let errorMessage;
  for (const _name of [name].flat()) {
    errorMessage = get(errors, _name)?.message;
    if (errorMessage) break;
  }

  return <>{children(errorMessage)}</>;
};
