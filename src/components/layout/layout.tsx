import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Layout 布局容器
 */
@Component({
  tag: 'ldesign-layout',
  styleUrl: 'layout.less',
  shadow: false,
})
export class LdesignLayout {
  /**
   * 布局方向
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'vertical';

  render(): any {
    const classes = {
      'ldesign-layout': true,
      [`ldesign-layout--${this.direction}`]: true,
    };

    return (
      <Host class={classes}>
        <slot />
      </Host>
    );
  }
}
