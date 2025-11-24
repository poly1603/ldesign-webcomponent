import { Component, Prop, Element, Event, EventEmitter, Method, State, h, Host } from '@stencil/core';

export type FormRuleType = 'string' | 'number' | 'boolean' | 'email' | 'url' | 'array' | 'object' | 'date' | 'integer' | 'float';
export type FormRuleTrigger = 'change' | 'blur' | 'submit';

export interface FormRule {
  required?: boolean;
  type?: FormRuleType;
  pattern?: RegExp | string;
  min?: number;  // 最小长度/值
  max?: number;  // 最大长度/值
  len?: number;  // 精确长度
  validator?: (value: any, values?: Record<string, any>) => boolean | string | Promise<boolean | string>;
  asyncValidator?: (value: any, values?: Record<string, any>) => Promise<boolean | string>;
  message?: string;
  trigger?: FormRuleTrigger | FormRuleTrigger[];
  debounce?: number;  // 防抖延迟（ms）
}

export interface FormItem {
  name: string;
  value: any;
  rules?: FormRule[];
  error?: string;
  touched?: boolean;
  validating?: boolean;
}

export interface FormSnapshot {
  values: Record<string, any>;
  timestamp: number;
}

type FieldWatcher = (value: any, oldValue: any, values: Record<string, any>) => void;

/**
 * Form 表单组件
 * 统一管理表单验证和数据
 */
@Component({
  tag: 'ldesign-form',
  styleUrl: 'form.less',
  shadow: false,
})
export class LdesignForm {
  @Element() el!: HTMLElement;

  /**
   * 表单布局
   */
  @Prop() layout: 'horizontal' | 'vertical' | 'inline' = 'horizontal';

  /**
   * 标签宽度
   */
  @Prop() labelWidth?: string | number;

  /**
   * 标签位置
   */
  @Prop() labelAlign: 'left' | 'right' = 'right';

  /**
   * 表单尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 表单提交事件
   */
  @Event() ldesignSubmit!: EventEmitter<Record<string, any>>;

  /**
   * 表单重置事件
   */
  @Event() ldesignReset!: EventEmitter<void>;

  /**
   * 验证失败事件
   */
  @Event() ldesignValidateError!: EventEmitter<Record<string, string>>;

  /**
   * 字段值变化事件
   */
  @Event() ldesignFieldChange!: EventEmitter<{ name: string; value: any; values: Record<string, any> }>;

  @State() validatingFields: Set<string> = new Set();

  private formItems: Map<string, FormItem> = new Map();
  private fieldWatchers: Map<string, Set<FieldWatcher>> = new Map();
  private debounceTimers: Map<string, any> = new Map();
  private initialValues: Record<string, any> = {};

  /**
   * 注册表单项
   */
  @Method()
  async registerField(name: string, value: any, rules?: FormRule[]): Promise<void> {
    this.formItems.set(name, { name, value, rules });
  }

  /**
   * 更新字段值
   */
  @Method()
  async setFieldValue(name: string, value: any): Promise<void> {
    const item = this.formItems.get(name);
    if (item) {
      const oldValue = item.value;
      item.value = value;

      // 触发字段监听器
      const watchers = this.fieldWatchers.get(name);
      if (watchers) {
        const allValues = await this.getFieldsValue();
        watchers.forEach(watcher => watcher(value, oldValue, allValues));
      }

      // 触发变化事件
      const allValues = await this.getFieldsValue();
      this.ldesignFieldChange.emit({ name, value, values: allValues });
    }
  }

  /**
   * 获取表单值
   */
  @Method()
  async getFieldsValue(): Promise<Record<string, any>> {
    const values: Record<string, any> = {};
    this.formItems.forEach((item) => {
      values[item.name] = item.value;
    });
    return values;
  }

  /**
   * 验证单个字段
   */
  @Method()
  async validateField(name: string): Promise<string | null> {
    const item = this.formItems.get(name);
    if (!item || !item.rules) return null;

    const allValues = await this.getFieldsValue();

    for (const rule of item.rules) {
      const error = await this.validateRule(item.value, rule, allValues);
      if (error) {
        item.error = error;
        return error;
      }
    }

    item.error = undefined;
    return null;
  }

  /**
   * 验证表单
   */
  @Method()
  async validate(): Promise<{ valid: boolean; errors: Record<string, string> }> {
    const errors: Record<string, string> = {};
    const allValues = await this.getFieldsValue();

    for (const [name, item] of this.formItems) {
      if (!item.rules) continue;

      for (const rule of item.rules) {
        const error = await this.validateRule(item.value, rule, allValues);
        if (error) {
          errors[name] = error;
          item.error = error;
          break;
        }
      }

      if (!errors[name]) {
        item.error = undefined;
      }
    }

    const valid = Object.keys(errors).length === 0;
    if (!valid) {
      this.ldesignValidateError.emit(errors);
    }

    return { valid, errors };
  }

  /**
   * 验证规则
   */
  private async validateRule(value: any, rule: FormRule, allValues: Record<string, any>): Promise<string | null> {
    // Required
    if (rule.required) {
      if (value === undefined || value === null || value === '') {
        return rule.message || '此字段为必填项';
      }
      if (Array.isArray(value) && value.length === 0) {
        return rule.message || '至少选择一项';
      }
    }

    // Skip validation if value is empty and not required
    if (!value && !rule.required) return null;

    // Type validation
    if (rule.type) {
      const typeError = this.validateType(value, rule.type);
      if (typeError) {
        return rule.message || typeError;
      }
    }

    // Pattern
    if (rule.pattern) {
      const pattern = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern;
      if (!pattern.test(String(value))) {
        return rule.message || '格式不正确';
      }
    }

    // Length validation
    if (rule.len !== undefined) {
      const length = typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : 0;
      if (length !== rule.len) {
        return rule.message || `长度必须为 ${rule.len}`;
      }
    }

    if (rule.min !== undefined) {
      if (typeof value === 'number') {
        if (value < rule.min) {
          return rule.message || `最小值为 ${rule.min}`;
        }
      } else {
        const length = typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : 0;
        if (length < rule.min) {
          return rule.message || `最小长度为 ${rule.min}`;
        }
      }
    }

    if (rule.max !== undefined) {
      if (typeof value === 'number') {
        if (value > rule.max) {
          return rule.message || `最大值为 ${rule.max}`;
        }
      } else {
        const length = typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : 0;
        if (length > rule.max) {
          return rule.message || `最大长度为 ${rule.max}`;
        }
      }
    }

    // Custom validator
    if (rule.validator) {
      const result = await rule.validator(value, allValues);
      if (result !== true) {
        return typeof result === 'string' ? result : (rule.message || '验证失败');
      }
    }

    // Async validator
    if (rule.asyncValidator) {
      const result = await rule.asyncValidator(value, allValues);
      if (result !== true) {
        return typeof result === 'string' ? result : (rule.message || '验证失败');
      }
    }

    return null;
  }

  /**
   * 类型验证
   */
  private validateType(value: any, type: FormRuleType): string | null {
    switch (type) {
      case 'string':
        if (typeof value !== 'string') return '必须是字符串';
        break;
      case 'number':
      case 'integer':
      case 'float':
        if (typeof value !== 'number' || isNaN(value)) return '必须是数字';
        if (type === 'integer' && !Number.isInteger(value)) return '必须是整数';
        break;
      case 'boolean':
        if (typeof value !== 'boolean') return '必须是布尔值';
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) return '邮箱格式不正确';
        break;
      case 'url':
        try {
          new URL(value);
        } catch {
          return 'URL格式不正确';
        }
        break;
      case 'array':
        if (!Array.isArray(value)) return '必须是数组';
        break;
      case 'object':
        if (typeof value !== 'object' || value === null || Array.isArray(value)) return '必须是对象';
        break;
      case 'date':
        if (!(value instanceof Date) && isNaN(Date.parse(value))) return '日期格式不正确';
        break;
    }
    return null;
  }

  /**
   * 监听字段变化
   */
  @Method()
  async watch(name: string, callback: FieldWatcher): Promise<() => void> {
    if (!this.fieldWatchers.has(name)) {
      this.fieldWatchers.set(name, new Set());
    }
    this.fieldWatchers.get(name)!.add(callback);

    // 返回取消监听函数
    return () => {
      this.fieldWatchers.get(name)?.delete(callback);
    };
  }

  /**
   * 创建表单快照
   */
  @Method()
  async snapshot(): Promise<FormSnapshot> {
    const values = await this.getFieldsValue();
    return {
      values: { ...values },
      timestamp: Date.now(),
    };
  }

  /**
   * 恢复表单快照
   */
  @Method()
  async restore(snapshot: FormSnapshot): Promise<void> {
    for (const [name, value] of Object.entries(snapshot.values)) {
      await this.setFieldValue(name, value);
    }
  }

  /**
   * 检查表单是否已变化
   */
  @Method()
  async isChanged(): Promise<boolean> {
    const currentValues = await this.getFieldsValue();
    return JSON.stringify(currentValues) !== JSON.stringify(this.initialValues);
  }

  /**
   * 获取已变化的字段
   */
  @Method()
  async getChangedFields(): Promise<Record<string, { oldValue: any; newValue: any }>> {
    const currentValues = await this.getFieldsValue();
    const changed: Record<string, { oldValue: any; newValue: any }> = {};

    for (const [name, newValue] of Object.entries(currentValues)) {
      const oldValue = this.initialValues[name];
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changed[name] = { oldValue, newValue };
      }
    }

    return changed;
  }

  /**
   * 设置初始值
   */
  @Method()
  async setInitialValues(values: Record<string, any>): Promise<void> {
    this.initialValues = { ...values };
    for (const [name, value] of Object.entries(values)) {
      await this.setFieldValue(name, value);
    }
  }

  /**
   * 重置表单
   */
  @Method()
  async reset(): Promise<void> {
    for (const [name] of this.formItems) {
      const initialValue = this.initialValues[name];
      await this.setFieldValue(name, initialValue !== undefined ? initialValue : '');
    }
    this.formItems.forEach(item => {
      item.error = undefined;
      item.touched = false;
    });
    this.ldesignReset.emit();
  }

  /**
   * 提交表单
   */
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const { valid, errors } = await this.validate();

    if (valid) {
      const values = await this.getFieldsValue();
      this.ldesignSubmit.emit(values);
    }
  }

  render(): any {
    const classes = {
      'ldesign-form': true,
      [`ldesign-form--${this.layout}`]: true,
      [`ldesign-form--${this.size}`]: true,
      [`ldesign-form--label-${this.labelAlign}`]: true,
      'ldesign-form--disabled': this.disabled,
    };

    const style: any = {};
    if (this.labelWidth) {
      style['--ldesign-form-label-width'] = typeof this.labelWidth === 'number'
        ? `${this.labelWidth}px`
        : this.labelWidth;
    }

    return (
      <Host class={classes} style={style}>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <slot />
        </form>
      </Host>
    );
  }
}
