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
  Mentions,
  MentionsProps,
  PasswordInput,
  PasswordInputProps,
  RadioGroup,
  RadioGroupProps,
  Select,
  SelectProps,
  TextArea,
  TextAreaProps,
  TimeInput,
  TimeInputProps,
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
const FormPasswordInput = (props: FieldProps & Omit<PasswordInputProps, keyof FieldProps>) => (
  <Field {...props} component={PasswordInput} />
);
const FormTimeInput = (props: FieldProps & Omit<TimeInputProps, keyof FieldProps>) => (
  <Field {...props} component={TimeInput} emptyValue='00:00' />
);
const FormMentions = (props: FieldProps & Omit<MentionsProps, keyof FieldProps>) => (
  <Field {...props} component={Mentions} />
);

const FormErrorMessage = ({ name, className, ...restProps }: HTMLDivProps & { name: string }) => (
  <ErrorMessage name={name}>
    {message =>
      message ? (
        <p className={classNames('text-danger', className)} {...restProps}>
          {message}
        </p>
      ) : null
    }
  </ErrorMessage>
);

Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.Checkbox = FormCheckbox;
Form.CheckboxGroup = FormCheckboxGroup;
Form.RadioGroup = FormRadioGroup;
Form.Select = FormSelect;
Form.PasswordInput = FormPasswordInput;
Form.TimeInput = FormTimeInput;
Form.Mentions = FormMentions;
Form.ErrorMessage = FormErrorMessage;
