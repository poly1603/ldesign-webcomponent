import { Component, Prop, Element, Event, EventEmitter, Method, h, Host } from '@stencil/core';

export interface FormRule {
  required?: boolean;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  validator?: (value: any) => boolean | string | Promise<boolean | string>;
  message?: string;
}

export interface FormItem {
  name: string;
  value: any;
  rules?: FormRule[];
  error?: string;
}

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

  private formItems: Map<string, FormItem> = new Map();

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
      item.value = value;
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
   * 验证表单
   */
  @Method()
  async validate(): Promise<{ valid: boolean; errors: Record<string, string> }> {
    const errors: Record<string, string> = {};

    for (const [name, item] of this.formItems) {
      if (!item.rules) continue;

      for (const rule of item.rules) {
        // Required
        if (rule.required && !item.value) {
          errors[name] = rule.message || `${name} is required`;
          break;
        }

        // Pattern
        if (rule.pattern && item.value) {
          const pattern = typeof rule.pattern === 'string' ? new RegExp(rule.pattern) : rule.pattern;
          if (!pattern.test(item.value)) {
            errors[name] = rule.message || `${name} format is invalid`;
            break;
          }
        }

        // Min/Max
        if (rule.min !== undefined && item.value.length < rule.min) {
          errors[name] = rule.message || `${name} minimum length is ${rule.min}`;
          break;
        }

        if (rule.max !== undefined && item.value.length > rule.max) {
          errors[name] = rule.message || `${name} maximum length is ${rule.max}`;
          break;
        }

        // Custom validator
        if (rule.validator) {
          const result = await rule.validator(item.value);
          if (result !== true) {
            errors[name] = typeof result === 'string' ? result : (rule.message || 'Validation failed');
            break;
          }
        }
      }
    }

    const valid = Object.keys(errors).length === 0;
    if (!valid) {
      this.ldesignValidateError.emit(errors);
    }

    return { valid, errors };
  }

  /**
   * 重置表单
   */
  @Method()
  async reset(): Promise<void> {
    this.formItems.clear();
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

/**
 * FormItem 表单项
 */
@Component({
  tag: 'ldesign-form-item',
  styleUrl: 'form.less',
  shadow: false,
})
export class LdesignFormItem {
  /**
   * 字段标签
   */
  @Prop() label?: string;

  /**
   * 字段名称
   */
  @Prop() name!: string;

  /**
   * 是否必填
   */
  @Prop() required: boolean = false;

  /**
   * 错误提示
   */
  @Prop() error?: string;

  /**
   * 帮助文本
   */
  @Prop() help?: string;

  render(): any {
    const classes = {
      'ldesign-form-item': true,
      'ldesign-form-item--required': this.required,
      'ldesign-form-item--error': !!this.error,
    };

    return (
      <Host class={classes}>
        {this.label && (
          <label class="ldesign-form-item__label">
            {this.label}
          </label>
        )}
        <div class="ldesign-form-item__control">
          <slot />
          {this.error && (
            <div class="ldesign-form-item__error">{this.error}</div>
          )}
          {this.help && !this.error && (
            <div class="ldesign-form-item__help">{this.help}</div>
          )}
        </div>
      </Host>
    );
  }
}




