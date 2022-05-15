import classNames from 'classnames';

import {
  ErrorMessage,
  Field,
  FieldProps,
  Form as HeadlessForm,
  FormProps as HeadlessFromProps,
} from '@/headless';

import { Checkbox, CheckboxProps } from './Checkbox';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
import { DatePicker, DatePickerProps } from './DatePicker';
import { Input, InputProps } from './Input';
import { MentionsEditor, MentionsEditorProps } from './MentionsEditor';
import { PasswordInput, PasswordInputProps } from './PasswordInput';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { RichTextEditor, richTextEditorEmptyValue, RichTextEditorProps } from './RichTextEditor';
import { Select, SelectProps } from './Select';
import { TextArea, TextAreaProps } from './TextArea';
import { TimeInput, TimeInputProps } from './TimeInput';
import { HTMLDivProps } from './types';

export type FormProps = HeadlessFromProps;

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
const FormMentionsEditor = (props: FieldProps & Omit<MentionsEditorProps, keyof FieldProps>) => (
  <Field {...props} component={MentionsEditor} emptyValue={richTextEditorEmptyValue} />
);
const FormRichTextEditor = (props: FieldProps & Omit<RichTextEditorProps, keyof FieldProps>) => (
  <Field {...props} component={RichTextEditor} emptyValue={richTextEditorEmptyValue} />
);
const FormDatePicker = (props: FieldProps & Omit<DatePickerProps, keyof FieldProps>) => (
  <Field {...props} component={DatePicker} emptyValue={props.range ? [] : undefined} />
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
Form.MentionsEditor = FormMentionsEditor;
Form.DatePicker = FormDatePicker;
Form.ErrorMessage = FormErrorMessage;
Form.RichTextEditor = FormRichTextEditor;
