import { Component, Prop, State, Element, h, Host, Listen } from '@stencil/core';

/**
 * Anchor 锚点组件
 * 用于快速定位到页面内容
 */
@Component({
  tag: 'ldesign-anchor',
  styleUrl: 'anchor.less',
  shadow: false,
})
export class LdesignAnchor {
  @Element() el!: HTMLElement;

  /**
   * 固定位置
   */
  @Prop() affix: boolean = true;

  /**
   * 距离窗口顶部偏移量
   */
  @Prop() offsetTop: number = 0;

  /**
   * 滚动容器选择器
   */
  @Prop() container?: string;

  /**
   * 当前激活的锚点
   */
  @State() activeLink: string = '';

  private scrollContainer?: HTMLElement | Window;
  private links: Map<string, HTMLElement> = new Map();

  componentDidLoad(): void {
    this.initScrollContainer();
    this.initLinks();
    this.handleScroll();
  }

  disconnectedCallback(): void {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * 初始化滚动容器
   */
  private initScrollContainer(): void {
    this.scrollContainer = this.container
      ? document.querySelector(this.container) || window
      : window;

    this.scrollContainer.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  /**
   * 初始化锚点链接
   */
  private initLinks(): void {
    const anchorLinks = this.el.querySelectorAll('ldesign-anchor-link');
    anchorLinks.forEach((link: any) => {
      const href = link.href;
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          this.links.set(href, target as HTMLElement);
        }
      }
    });
  }

  /**
   * 处理滚动
   */
  private handleScroll = (): void => {
    const scrollTop = this.scrollContainer instanceof Window
      ? window.pageYOffset
      : (this.scrollContainer as HTMLElement).scrollTop;

    let activeHref = '';
    let minDistance = Infinity;

    this.links.forEach((target, href) => {
      const rect = target.getBoundingClientRect();
      const distance = Math.abs(rect.top - this.offsetTop);

      if (distance < minDistance && rect.top <= this.offsetTop + 10) {
        minDistance = distance;
        activeHref = href;
      }
    });

    this.activeLink = activeHref;
  }

  render(): any {
    const classes = {
      'ldesign-anchor': true,
      'ldesign-anchor--affix': this.affix,
    };

    return (
      <Host class={classes}>
        <div class="ldesign-anchor__wrapper">
          <slot />
        </div>
      </Host>
    );
  }
}

/**
 * AnchorLink 锚点链接
 */
@Component({
  tag: 'ldesign-anchor-link',
  styleUrl: 'anchor.less',
  shadow: false,
})
export class LdesignAnchorLink {
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
    const anchor = (this as any).el.closest('ldesign-anchor');
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



