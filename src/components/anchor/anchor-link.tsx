import { Component, Prop, Listen, h, Host, Element } from '@stencil/core';

/**
 * AnchorLink 锚点链接
 */
@Component({
  tag: 'ldesign-anchor-link',
  styleUrl: 'anchor.less',
  shadow: false,
})
export class LdesignAnchorLink {
  @Element() el!: HTMLElement;

  /**
   * 链接地址
   */
  @Prop() href!: string;

  /**
   * 链接标题
   */
  @Prop() title!: string;

  /**
   * 处理点击
   */
  @Listen('click')
  handleClick(e: MouseEvent): void {
    e.preventDefault();

    const target = document.querySelector(this.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render(): any {
    const anchor = this.el.closest('ldesign-anchor') as any;
    const isActive = anchor?.activeLink === this.href;

    const classes = {
      'ldesign-anchor-link': true,
      'ldesign-anchor-link--active': isActive,
    };

    return (
      <Host class={classes}>
        <a href={this.href} class="ldesign-anchor-link__title">
          {this.title}
        </a>
        <div class="ldesign-anchor-link__children">
          <slot />
        </div>
      </Host>
    );
  }
}
