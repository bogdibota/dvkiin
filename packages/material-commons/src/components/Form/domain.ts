import { AccordionProps } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import { ReactNode } from 'react';

export type DVKValue =
  | string
  | number
  | string[]
  | DVKObject
  | DVKListItem[]
  | File;

export type DVKObject = {
  [key: string]: DVKValue;
};

export type DVKListItem = {
  id: any;
  syntheticId: string;
};

export type DVKInvalidFields = {
  [key: string]: boolean | string;
};

type BasicField<TType> = {
  name: string;
  type: TType;
};

type LabeledField<TType> = BasicField<TType> & {
  label: string;
};

export type FieldWithErrorManagement = {
  errorMessage?: string | { [key: string]: string };
};

export type PropsWithErrorManagement = {
  hasError: boolean;
  message: string | undefined;
};

export type DVKFieldMashed = DVKField &
  DVKDateTimeField &
  DVKListField &
  DVKSelectField &
  DVKDefaultField &
  DVKImageField &
  DVKFileField &
  DVKCheckboxField &
  DVKHiddenField &
  DVKComboBoxField;

export type DVKFieldType =
  | DVKDateTimeType
  | DVKListType
  | DVKSelectType
  | DVKDefaultType
  | DVKImageType
  | DVKFileType
  | DVKCheckboxType
  | DVKHiddenType
  | DVKComboBoxType;

export type DVKField = (
  | DVKDateTimeField
  | DVKListField
  | DVKSelectField
  | DVKDefaultField
  | DVKImageField
  | DVKFileField
  | DVKCheckboxField
  | DVKHiddenField
  | DVKComboBoxField
) & {
  infoModal?: { title: string; message: string; buttonProps?: any };
};

export function isHiddenField(field: DVKField): field is DVKHiddenField {
  return field.type === 'hidden';
}

export type DVKDateTimeType = 'date' | 'time' | 'date-time';
export type DVKDateTimeField = LabeledField<DVKDateTimeType> &
  FieldWithErrorManagement & {
    required?: boolean;
    disabled?: boolean;
  };

export type DVKListType = 'list';
export type DVKListField = LabeledField<DVKListType> & {
  fields: DVKField[];
  newLabel?: string;
  editLabel?: (value: DVKListItem) => string;
  deleteLabel?: (value: DVKListItem) => string;
  deleteMessage?: (value: DVKListItem) => string;
  accordionProps?: Omit<AccordionProps, 'children'>;
};

export type DVKSelectFieldValue =
  | string
  | {
      name: string;
      label: string;
    };
export type DVKSelectType = 'select';
export type DVKSelectField = LabeledField<DVKSelectType> &
  FieldWithErrorManagement & {
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    values: DVKSelectFieldValue[];
  };

export type DVKDefaultType = 'text' | 'email' | 'password' | 'number';
export type DVKDefaultField = LabeledField<DVKDefaultType> &
  FieldWithErrorManagement & {
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    multiline?: boolean;
  };

export type DVKImageType = 'image';
export type DVKImageField = LabeledField<DVKImageType> &
  FieldWithErrorManagement & {
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
  };

export type DVKFileType = 'file';
export type DVKFileField = LabeledField<DVKFileType> &
  FieldWithErrorManagement & {
    required?: boolean;
    disabled?: boolean;
    acceptedFileType?: string;
    multiple?: boolean;
  };
export type DVKCheckboxType = 'checkbox';
export type DVKCheckboxField = LabeledField<DVKCheckboxType> &
  FieldWithErrorManagement & {
    text?: string;
    required?: boolean;
    disabled?: boolean;
    checkboxProps?: CheckboxProps;
  };

export type DVKHiddenType = 'hidden';
export type DVKHiddenField = BasicField<DVKHiddenType>;

export type DVKComboBoxFieldValue =
  | string
  | ({
      name: string;
      label: string;
    } & any);
export type DVKComboBoxType = 'combo-box';
export type DVKComboBoxField<
  T extends DVKComboBoxFieldValue = any
> = LabeledField<DVKComboBoxType> &
  FieldWithErrorManagement & {
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    search?: (search: string) => Promise<T[]>;
    options?: T[];
    renderOption?: (value: T) => ReactNode;
  };
