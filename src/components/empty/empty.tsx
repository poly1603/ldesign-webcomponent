import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Empty 空状态组件
 * 用于展示空数据状态
 */
@Component({
  tag: 'ldesign-empty',
  styleUrl: 'empty.less',
  shadow: false,
})
export class LdesignEmpty {
  /**
   * 空状态描述文字
   */
  @Prop() description: string = '暂无数据';

  /**
   * 图片地址
   */
  @Prop() image?: string;

  /**
   * 图片大小
   */
  @Prop() imageSize: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 预设图片类型
   */
  @Prop() imageType: 'default' | 'simple' | 'search' = 'default';

  /**
   * 渲染默认图片
   */
  private renderDefaultImage(): any {
    const size = this.imageSize === 'small' ? 60 : this.imageSize === 'large' ? 120 : 90;

    if (this.imageType === 'simple') {
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" fill="var(--ld-color-gray-100, #f5f5f5)" />
          <path d="M32 20v24M20 32h24" stroke="var(--ld-color-gray-400, #bdbdbd)" stroke-width="2" stroke-linecap="round" />
        </svg>
      );
    }

    if (this.imageType === 'search') {
      return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
          <circle cx="26" cy="26" r="16" stroke="var(--ld-color-gray-400, #bdbdbd)" stroke-width="2" />
          <path d="M38 38l10 10" stroke="var(--ld-color-gray-400, #bdbdbd)" stroke-width="2" stroke-linecap="round" />
        </svg>
      );
    }

    // default
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <rect x="8" y="16" width="48" height="36" rx="4" fill="var(--ld-color-gray-100, #f5f5f5)" stroke="var(--ld-color-gray-300, #e0e0e0)" stroke-width="2" />
        <circle cx="20" cy="28" r="4" fill="var(--ld-color-gray-300, #e0e0e0)" />
        <path d="M16 44h32" stroke="var(--ld-color-gray-300, #e0e0e0)" stroke-width="2" stroke-linecap="round" />
        <path d="M16 38h24" stroke="var(--ld-color-gray-300, #e0e0e0)" stroke-width="2" stroke-linecap="round" />
      </svg>
    );
  }

  render(): any {
    return (
      <Host class="ldesign-empty">
        <div class={`ldesign-empty__image ldesign-empty__image--${this.imageSize}`}>
          {this.image ? <img src={this.image} alt={this.description} /> : this.renderDefaultImage()}
        </div>
        {this.description && (
          <div class="ldesign-empty__description">{this.description}</div>
        )}
        <div class="ldesign-empty__footer">
          <slot />
        </div>
      </Host>
    );
  }
}




