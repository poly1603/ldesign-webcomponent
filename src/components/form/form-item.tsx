import { Component, Prop, h, Host } from '@stencil/core';

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
