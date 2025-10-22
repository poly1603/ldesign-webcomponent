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



