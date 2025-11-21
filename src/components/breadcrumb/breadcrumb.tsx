import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Breadcrumb 面包屑组件
 * 显示当前页面的路径
 */
@Component({
  tag: 'ldesign-breadcrumb',
  styleUrl: 'breadcrumb.less',
  shadow: false,
})
export class LdesignBreadcrumb {
  /**
   * 分隔符
   */
  @Prop() separator: string = '/';

  /**
   * 分隔符图标
   */
  @Prop() separatorIcon?: string;

  render(): any {
    return (
      <Host class="ldesign-breadcrumb">
        <slot />
      </Host>
    );
  }
}
