import { Component, Prop, h, Host, Element } from '@stencil/core';

/**
 * BreadcrumbItem 面包屑项
 */
@Component({
  tag: 'ldesign-breadcrumb-item',
  styleUrl: 'breadcrumb.less',
  shadow: false,
})
export class LdesignBreadcrumbItem {
  @Element() el!: HTMLElement;

  /**
   * 链接地址
   */
  @Prop() href?: string;

  /**
   * 是否禁用
   */
  @Prop() disabled: boolean = false;

  /**
   * 图标
   */
  @Prop() icon?: string;

  private handleClick = (e: MouseEvent): void => {
    if (this.disabled || !this.href) {
      e.preventDefault();
    }
  };

  render(): any {
    const classes = {
      'ldesign-breadcrumb-item': true,
      'ldesign-breadcrumb-item--disabled': this.disabled,
    };

    const breadcrumb = this.el.closest('ldesign-breadcrumb') as any;
    const separator = breadcrumb?.separatorIcon ? (
      <ldesign-icon name={breadcrumb.separatorIcon} size="small" />
    ) : (
      breadcrumb?.separator || '/'
    );

    const content = (
      <span class="ldesign-breadcrumb-item__content">
        {this.icon && <ldesign-icon name={this.icon} size="small" />}
        <slot />
      </span>
    );

    return (
      <Host class={classes}>
        {this.href && !this.disabled ? (
          <a
            href={this.href}
            class="ldesign-breadcrumb-item__link"
            onClick={this.handleClick}
          >
            {content}
          </a>
        ) : (
          <span class="ldesign-breadcrumb-item__text">{content}</span>
        )}
        <span class="ldesign-breadcrumb-item__separator">{separator}</span>
      </Host>
    );
  }
}
