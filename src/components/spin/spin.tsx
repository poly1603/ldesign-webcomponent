import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Spin 加载指示器组件
 */
@Component({
  tag: 'ldesign-spin',
  styleUrl: 'spin.less',
  shadow: false,
})
export class LdesignSpin {
  /**
   * 是否加载中
   */
  @Prop() spinning: boolean = true;

  /**
   * 尺寸
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 提示文字
   */
  @Prop() tip?: string;

  /**
   * 延迟显示加载效果的时间（毫秒）
   */
  @Prop() delay: number = 0;

  /**
   * 自定义图标
   */
  @Prop() icon?: string;

  render(): any {
    if (!this.spinning) {
      return <slot />;
    }

    const classes = {
      'ldesign-spin': true,
      [`ldesign-spin--${this.size}`]: true,
      'ldesign-spin--has-tip': !!this.tip,
    };

    return (
      <Host class={classes}>
        <div class="ldesign-spin__container">
          <div class="ldesign-spin__spinner">
            {this.icon ? (
              <ldesign-icon name={this.icon} class="ldesign-spin__icon" />
            ) : (
              <div class="ldesign-spin__dot-wrapper">
                <span class="ldesign-spin__dot"></span>
                <span class="ldesign-spin__dot"></span>
                <span class="ldesign-spin__dot"></span>
                <span class="ldesign-spin__dot"></span>
              </div>
            )}
          </div>
          {this.tip && (
            <div class="ldesign-spin__tip">{this.tip}</div>
          )}
        </div>
        <div class="ldesign-spin__content">
          <slot />
        </div>
      </Host>
    );
  }
}



