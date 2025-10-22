import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Result 结果页组件
 * 用于反馈操作结果
 */
@Component({
  tag: 'ldesign-result',
  styleUrl: 'result.less',
  shadow: false,
})
export class LdesignResult {
  /**
   * 结果状态
   */
  @Prop() status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' = 'info';

  /**
   * 标题
   */
  @Prop() title?: string;

  /**
   * 副标题/描述
   */
  @Prop() subTitle?: string;

  /**
   * 自定义图标
   */
  @Prop() icon?: string;

  /**
   * 渲染默认图标
   */
  private renderIcon(): any {
    if (this.icon) {
      return <ldesign-icon name={this.icon} />;
    }

    const iconMap = {
      success: 'check-circle',
      error: 'x-circle',
      info: 'info',
      warning: 'alert-triangle',
      '404': 'file-search',
      '403': 'shield-off',
      '500': 'server-crash',
    };

    return <ldesign-icon name={iconMap[this.status]} />;
  }

  /**
   * 获取默认标题
   */
  private getDefaultTitle(): string {
    if (this.title) return this.title;

    const titleMap = {
      success: '成功',
      error: '失败',
      info: '信息',
      warning: '警告',
      '404': '404',
      '403': '403',
      '500': '500',
    };

    return titleMap[this.status];
  }

  render(): any {
    const classes = {
      'ldesign-result': true,
      [`ldesign-result--${this.status}`]: true,
    };

    return (
      <Host class={classes}>
        <div class="ldesign-result__icon">
          {this.renderIcon()}
        </div>
        <div class="ldesign-result__title">
          {this.getDefaultTitle()}
        </div>
        {this.subTitle && (
          <div class="ldesign-result__subtitle">
            {this.subTitle}
          </div>
        )}
        <div class="ldesign-result__extra">
          <slot />
        </div>
      </Host>
    );
  }
}



