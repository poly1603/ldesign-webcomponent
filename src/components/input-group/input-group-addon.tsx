import { Component, h, Host } from '@stencil/core';

/**
 * InputGroupAddon 输入框前后缀
 * 用于显示输入框的前后缀内容
 */
@Component({
  tag: 'ldesign-input-group-addon',
  styleUrl: 'input-group.less',
  shadow: true,
})
export class LdesignInputGroupAddon {
  render() {
    return (
      <Host class="input-group__addon">
        <slot />
      </Host>
    );
  }
}
