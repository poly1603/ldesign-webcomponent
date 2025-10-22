import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Skeleton 骨架屏组件
 * 用于内容加载时的占位效果
 */
@Component({
  tag: 'ldesign-skeleton',
  styleUrl: 'skeleton.less',
  shadow: false,
})
export class LdesignSkeleton {
  /**
   * 是否显示动画
   */
  @Prop() animated: boolean = true;

  /**
   * 是否加载中
   */
  @Prop() loading: boolean = true;

  /**
   * 渲染行数
   */
  @Prop() rows: number = 3;

  /**
   * 是否显示头像
   */
  @Prop() avatar: boolean = false;

  /**
   * 头像形状
   */
  @Prop() avatarShape: 'circle' | 'square' = 'circle';

  /**
   * 头像大小
   */
  @Prop() avatarSize: 'small' | 'medium' | 'large' = 'medium';

  /**
   * 是否显示标题
   */
  @Prop() title: boolean = true;

  /**
   * 段落配置
   */
  @Prop() paragraph: boolean = true;

  /**
   * 骨架屏类型
   */
  @Prop() type: 'text' | 'rect' | 'circle' | 'image' = 'text';

  /**
   * 宽度
   */
  @Prop() width?: string | number;

  /**
   * 高度
   */
  @Prop() height?: string | number;

  /**
   * 圆角
   */
  @Prop() borderRadius?: string | number;

  /**
   * 渲染骨架屏
   */
  private renderSkeleton(): any {
    if (this.type === 'text') {
      return this.renderTextSkeleton();
    }

    if (this.type === 'circle') {
      return this.renderCircleSkeleton();
    }

    if (this.type === 'image') {
      return this.renderImageSkeleton();
    }

    return this.renderRectSkeleton();
  }

  /**
   * 渲染文本骨架屏
   */
  private renderTextSkeleton(): any {
    const avatarSizeMap = {
      small: '32px',
      medium: '40px',
      large: '48px',
    };

    return (
      <div class="ldesign-skeleton__wrapper">
        {this.avatar && (
          <div
            class={`ldesign-skeleton__avatar ldesign-skeleton__avatar--${this.avatarShape}`}
            style={{
              width: avatarSizeMap[this.avatarSize],
              height: avatarSizeMap[this.avatarSize],
            }}
          />
        )}
        <div class="ldesign-skeleton__content">
          {this.title && (
            <div
              class="ldesign-skeleton__title"
              style={{ width: '40%' }}
            />
          )}
          {this.paragraph && (
            <div class="ldesign-skeleton__paragraph">
              {Array.from({ length: this.rows }).map((_, index) => (
                <div
                  key={index}
                  class="ldesign-skeleton__paragraph-line"
                  style={{
                    width: index === this.rows - 1 ? '60%' : '100%',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /**
   * 渲染矩形骨架屏
   */
  private renderRectSkeleton(): any {
    const style: any = {};
    if (this.width) {
      style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
    }
    if (this.height) {
      style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }
    if (this.borderRadius) {
      style.borderRadius = typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius;
    }

    return <div class="ldesign-skeleton__rect" style={style} />;
  }

  /**
   * 渲染圆形骨架屏
   */
  private renderCircleSkeleton(): any {
    const size = this.width || this.height || '40px';
    const sizeValue = typeof size === 'number' ? `${size}px` : size;

    return (
      <div
        class="ldesign-skeleton__circle"
        style={{
          width: sizeValue,
          height: sizeValue,
        }}
      />
    );
  }

  /**
   * 渲染图片骨架屏
   */
  private renderImageSkeleton(): any {
    const style: any = {};
    if (this.width) {
      style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
    }
    if (this.height) {
      style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
    }

    return (
      <div class="ldesign-skeleton__image" style={style}>
        <svg viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zM338 304c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm513.9 437.1c-1.4 1.4-3.1 2.5-5.1 3.1L150.4 726c-19.2-2-34.8-17-37.1-35.9l-.8-6.8 2.2-4.9L310 430.8c9.4-15.8 29.9-20.9 45.7-11.5l0.1.1 196 116.8 175.3-202c8.9-10.3 24.5-11.4 34.8-2.5l1.8 1.6L911.8 488c10.3 8.9 11.4 24.5 2.5 34.8l-.2.3-62.2 72z" />
        </svg>
      </div>
    );
  }

  render(): any {
    if (!this.loading) {
      return <slot />;
    }

    const classes = {
      'ldesign-skeleton': true,
      'ldesign-skeleton--animated': this.animated,
    };

    return (
      <Host class={classes}>
        {this.renderSkeleton()}
      </Host>
    );
  }
}




