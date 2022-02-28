import { ErrorMessage, Field, FieldProps, Form as HeadlessForm, FormProps } from '@/headless';
import { HTMLDivProps } from '@/types';
import classNames from 'classnames';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  CheckboxProps,
  Input,
  InputProps,
  RadioGroup,
  RadioGroupProps,
  Select,
  SelectProps,
  TextArea,
  TextAreaProps,
} from '../fields';

// eslint-disable-next-line no-empty-pattern
export const Form = (props: FormProps) => <HeadlessForm {...props} />;

const FormInput = (props: FieldProps & Omit<InputProps, keyof FieldProps>) => (
  <Field {...props} component={Input} />
);
const FormTextArea = (props: FieldProps & Omit<TextAreaProps, keyof FieldProps>) => (
  <Field {...props} component={TextArea} />
);
const FormCheckbox = (props: FieldProps & Omit<CheckboxProps, keyof FieldProps>) => (
  <Field {...props} component={Checkbox} />
);
const FormCheckboxGroup = (props: FieldProps & Omit<CheckboxGroupProps, keyof FieldProps>) => (
  <Field {...props} component={CheckboxGroup} />
);
const FormRadioGroup = (props: FieldProps & Omit<RadioGroupProps, keyof FieldProps>) => (
  <Field {...props} component={RadioGroup} />
);
const FormSelect = (props: FieldProps & Omit<SelectProps, keyof FieldProps>) => (
  <Field {...props} component={Select} />
);

const FormErrorMessage = ({ name, className, ...restProps }: HTMLDivProps & { name: string }) => (
  <p className={classNames('text-danger', className)} {...restProps}>
    <ErrorMessage name={name}></ErrorMessage>
  </p>
);

Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.Checkbox = FormCheckbox;
Form.CheckboxGroup = FormCheckboxGroup;
Form.RadioGroup = FormRadioGroup;
Form.Select = FormSelect;
Form.ErrorMessage = FormErrorMessage;
