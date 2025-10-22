import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Card 卡片组件
 * 通用卡片容器
 */
@Component({
  tag: 'ldesign-card',
  styleUrl: 'card.less',
  shadow: false,
})
export class LdesignCard {
  /**
   * 卡片标题
   */
  @Prop() title?: string;

  /**
   * 卡片尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 是否显示边框
   */
  @Prop() bordered: boolean = true;

  /**
   * 是否可悬浮
   */
  @Prop() hoverable: boolean = false;

  /**
   * 是否加载中
   */
  @Prop() loading: boolean = false;

  /**
   * 卡片阴影
   */
  @Prop() shadow: 'never' | 'hover' | 'always' = 'hover';

  /**
   * 头部样式
   */
  @Prop() headerStyle?: string;

  /**
   * 主体样式
   */
  @Prop() bodyStyle?: string;

  render(): any {
    const classes = {
      'ldesign-card': true,
      'ldesign-card--bordered': this.bordered,
      'ldesign-card--hoverable': this.hoverable,
      'ldesign-card--loading': this.loading,
      [`ldesign-card--${this.size}`]: true,
      [`ldesign-card--shadow-${this.shadow}`]: true,
    };

    return (
      <Host class={classes}>
        {(this.title || this.$slots.title || this.$slots.extra) && (
          <div class="ldesign-card__header" style={this.headerStyle}>
            <div class="ldesign-card__title">
              {this.title || <slot name="title" />}
            </div>
            <div class="ldesign-card__extra">
              <slot name="extra" />
            </div>
          </div>
        )}

        <div class="ldesign-card__body" style={this.bodyStyle}>
          {this.loading ? (
            <ldesign-skeleton rows={3} />
          ) : (
            <slot />
          )}
        </div>

        {this.$slots.footer && (
          <div class="ldesign-card__footer">
            <slot name="footer" />
          </div>
        )}
      </Host>
    );
  }

  private get $slots() {
    return {
      title: !!this.el.querySelector('[slot="title"]'),
      extra: !!this.el.querySelector('[slot="extra"]'),
      footer: !!this.el.querySelector('[slot="footer"]'),
    };
  }

  private get el(): HTMLElement {
    return (this as any).el;
  }
}




