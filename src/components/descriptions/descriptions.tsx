import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Descriptions 描述列表组件
 */
@Component({
  tag: 'ldesign-descriptions',
  styleUrl: 'descriptions.less',
  shadow: false,
})
export class LdesignDescriptions {
  /**
   * 标题
   */
  @Prop() title?: string;

  /**
   * 列数
   */
  @Prop() column: number = 3;

  /**
   * 是否显示边框
   */
  @Prop() bordered: boolean = false;

  /**
   * 尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 布局方式
   */
  @Prop() layout: 'horizontal' | 'vertical' = 'horizontal';

  render(): any {
    const classes = {
      'ldesign-descriptions': true,
      'ldesign-descriptions--bordered': this.bordered,
      [`ldesign-descriptions--${this.size}`]: true,
      [`ldesign-descriptions--${this.layout}`]: true,
    };

    const style = {
      '--descriptions-column': this.column.toString(),
    };

    return (
      <Host class={classes} style={style}>
        {this.title && (
          <div class="ldesign-descriptions__title">{this.title}</div>
        )}
        <div class="ldesign-descriptions__view">
          <slot />
        </div>
      </Host>
    );
  }
}
