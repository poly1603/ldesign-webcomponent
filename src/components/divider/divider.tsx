import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Divider 分割线组件
 * 用于分隔不同内容区域
 */
@Component({
  tag: 'ldesign-divider',
  styleUrl: 'divider.less',
  shadow: false,
})
export class LdesignDivider {
  /**
   * 分割线方向
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 文字位置
   */
  @Prop() textPosition: 'left' | 'center' | 'right' = 'center';

  /**
   * 是否虚线
   */
  @Prop() dashed: boolean = false;

  /**
   * 文字内容
   */
  @Prop() text?: string;

  render(): any {
    const hasText = this.text || this.hasSlot();

    const classes = {
      'ldesign-divider': true,
      [`ldesign-divider--${this.direction}`]: true,
      'ldesign-divider--with-text': hasText && this.direction === 'horizontal',
      [`ldesign-divider--text-${this.textPosition}`]: hasText,
      'ldesign-divider--dashed': this.dashed,
    };

    if (this.direction === 'vertical') {
      return <Host class={classes}></Host>;
    }

    return (
      <Host class={classes}>
        {hasText && (
          <span class="ldesign-divider__text">
            {this.text || <slot />}
          </span>
        )}
      </Host>
    );
  }

  private hasSlot(): boolean {
    const el = (this as any).el as HTMLElement;
    return el.childNodes.length > 0;
  }
}




