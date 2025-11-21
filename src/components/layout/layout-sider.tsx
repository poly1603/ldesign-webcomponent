import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Layout Sider
 */
@Component({
  tag: 'ldesign-layout-sider',
  styleUrl: 'layout.less',
  shadow: false,
})
export class LdesignLayoutSider {
  /**
   * 宽度
   */
  @Prop() width: string = '200px';

  /**
   * 是否可折叠
   */
  @Prop() collapsible: boolean = false;

  /**
   * 是否已折叠
   */
  @Prop({ mutable: true }) collapsed: boolean = false;

  /**
   * 折叠后的宽度
   */
  @Prop() collapsedWidth: string = '80px';

  render(): any {
    const classes = {
      'ldesign-layout-sider': true,
      'ldesign-layout-sider--collapsed': this.collapsed,
    };

    const style = {
      width: this.collapsed ? this.collapsedWidth : this.width,
    };

    return (
      <Host class={classes} style={style}>
        <div class="ldesign-layout-sider__content">
          <slot />
        </div>
        {this.collapsible && (
          <div
            class="ldesign-layout-sider__trigger"
            onClick={() => (this.collapsed = !this.collapsed)}
          >
            <ldesign-icon name={this.collapsed ? 'chevron-right' : 'chevron-left'} />
          </div>
        )}
      </Host>
    );
  }
}
