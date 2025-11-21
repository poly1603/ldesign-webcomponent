import { Component, h, Host } from '@stencil/core';

/**
 * Layout Content
 */
@Component({
  tag: 'ldesign-layout-content',
  styleUrl: 'layout.less',
  shadow: false,
})
export class LdesignLayoutContent {
  render(): any {
    return (
      <Host class="ldesign-layout-content">
        <slot />
      </Host>
    );
  }
}
