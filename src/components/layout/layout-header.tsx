import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Layout Header
 */
@Component({
  tag: 'ldesign-layout-header',
  styleUrl: 'layout.less',
  shadow: false,
})
export class LdesignLayoutHeader {
  /**
   * 高度
   */
  @Prop() height: string = '64px';

  render(): any {
    return (
      <Host class="ldesign-layout-header" style={{ height: this.height }}>
        <slot />
      </Host>
    );
  }
}
