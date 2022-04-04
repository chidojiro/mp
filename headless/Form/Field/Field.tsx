import get from 'lodash/get';
import React, { RefObject } from 'react';
import { RegisterOptions, useController, useFormContext } from 'react-hook-form';

export type Props<T = any> = {
  rules?: RegisterOptions;
  name: string;
  errorGroup?: string[];
  className?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  value?: any;
  emptyValue?: any;
  componentType?: 'checkbox' | 'radio' | 'common';
  component: React.ComponentType<T>;
  inputRef?: RefObject<any>;
};

export const Field = <T,>({
  component,
  name,
  rules,
  onChange: onChangeProp,
  onBlur: onBlurProp,
  className,
  value: valueProp,
  errorGroup = [],
  emptyValue = '',
  componentType = 'common',
  inputRef,
  ...restProps
}: Props<T>) => {
  const Component = component;

  const {
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useFormContext();

  const {
    field: { onChange, onBlur, value, ref: fieldRef, ...restField },
  } = useController({ name, rules });

  React.useEffect(() => {
    if (emptyValue && !value) {
      setValue(name, emptyValue, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const error = get(errors, name);
  const errorMessage = error?.message;

  const hasGroupError = errorGroup.reduce((acc, cur) => acc && get(errors, cur)?.message, false);

  const values = errorGroup.map(name => getValues(name));

  React.useEffect(() => {
    if (hasGroupError) {
      errorGroup.forEach(name => clearErrors(name));
    } else {
      errorGroup.forEach(name => setError(name, { message: errorMessage }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, errorMessage, setError, ...errorGroup, ...values]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e);
    onChangeProp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    onBlur();
    onBlurProp?.(e);
  };

  const isCheckboxOrRadio = ['checkbox', 'radio'].includes(componentType);

  const resolveValue = React.useCallback(
    () => {
      if (isCheckboxOrRadio) return valueProp;

      if ([null, undefined].includes(value)) return emptyValue;

      if (rules?.valueAsNumber) {
        return +value;
      }

      if (rules?.valueAsDate) {
        return new Date(value);
      }

      return value;
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      JSON.stringify(emptyValue),
      JSON.stringify(value),
      JSON.stringify(valueProp),
      rules?.valueAsDate,
      rules?.valueAsNumber,
      componentType,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );

  const hasError = !!error || hasGroupError;

  return (
    <Component
      onChange={handleChange}
      onBlur={handleBlur}
      error={hasError || (undefined as any)}
      className={className}
      value={resolveValue()}
      checked={isCheckboxOrRadio ? !!value : false}
      ref={inputRef ?? fieldRef}
      {...restField}
      {...(restProps as any)}
    />
  );
};

export default Field;
