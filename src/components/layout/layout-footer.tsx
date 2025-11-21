import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Layout Footer
 */
@Component({
  tag: 'ldesign-layout-footer',
  styleUrl: 'layout.less',
  shadow: false,
})
export class LdesignLayoutFooter {
  /**
   * 高度
   */
  @Prop() height: string = '70px';

  render(): any {
    return (
      <Host class="ldesign-layout-footer" style={{ height: this.height }}>
        <slot />
      </Host>
    );
  }
}
