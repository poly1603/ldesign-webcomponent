import { Component, Prop, h, Host } from '@stencil/core';

/**
 * DescriptionsItem 描述项
 */
@Component({
  tag: 'ldesign-descriptions-item',
  styleUrl: 'descriptions.less',
  shadow: false,
})
export class LdesignDescriptionsItem {
  /**
   * 标签
   */
  @Prop() label!: string;

  /**
   * 跨列数
   */
  @Prop() span: number = 1;

  render(): any {
    const style = {
      '--item-span': this.span.toString(),
    };

    return (
      <Host class="ldesign-descriptions-item" style={style}>
        <div class="ldesign-descriptions-item__label">{this.label}</div>
        <div class="ldesign-descriptions-item__content">
          <slot />
        </div>
      </Host>
    );
  }
}
