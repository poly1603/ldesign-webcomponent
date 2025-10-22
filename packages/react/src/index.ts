/**
 * @ldesign/webcomponent-react
 * React 集成包
 */

import React from 'react';
import { createComponent } from '@lit/react';

// 导入 Web Components
import {
  LdesignButton as ButtonWC,
  LdesignInput as InputWC,
  LdesignTable as TableWC,
  LdesignCard as CardWC,
  LdesignForm as FormWC,
} from '@ldesign/webcomponent';

/**
 * Button 组件
 */
export const Button = createComponent({
  tagName: 'ldesign-button',
  elementClass: ButtonWC,
  react: React,
  events: {
    onClick: 'ldesignClick',
  },
});

/**
 * Input 组件
 */
export const Input = createComponent({
  tagName: 'ldesign-input',
  elementClass: InputWC,
  react: React,
  events: {
    onChange: 'ldesignChange',
    onInput: 'ldesignInput',
    onFocus: 'ldesignFocus',
    onBlur: 'ldesignBlur',
  },
});

/**
 * Table 组件
 */
export const Table = createComponent({
  tagName: 'ldesign-table',
  elementClass: TableWC,
  react: React,
  events: {
    onSort: 'ldesignSort',
    onRowClick: 'ldesignRowClick',
  },
});

/**
 * Card 组件
 */
export const Card = createComponent({
  tagName: 'ldesign-card',
  elementClass: CardWC,
  react: React,
});

/**
 * Form 组件
 */
export const Form = createComponent({
  tagName: 'ldesign-form',
  elementClass: FormWC,
  react: React,
  events: {
    onSubmit: 'ldesignSubmit',
    onReset: 'ldesignReset',
    onValidateError: 'ldesignValidateError',
  },
});

/**
 * 导出类型定义
 */
export type {
  Size,
  ButtonType,
  ButtonColor,
  ButtonShape,
  InputType,
  Theme,
  ComponentStatus,
} from '@ldesign/webcomponent';

/**
 * 导出 React 组件类型
 */
export interface ButtonProps {
  type?: 'primary' | 'default' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  block?: boolean;
  onClick?: (event: MouseEvent) => void;
  children?: React.ReactNode;
}

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export interface TableProps {
  columns: any[];
  dataSource: any[];
  bordered?: boolean;
  striped?: boolean;
  virtual?: boolean;
  height?: number | string;
  onSort?: (sort: { key: string; order: 'asc' | 'desc' }) => void;
  onRowClick?: (data: { row: any; index: number }) => void;
}




