import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Timeline 时间轴组件
 */
@Component({
  tag: 'ldesign-timeline',
  styleUrl: 'timeline.less',
  shadow: false,
})
export class LdesignTimeline {
  /**
   * 时间轴模式
   */
  @Prop() mode: 'left' | 'right' | 'alternate' = 'left';

  /**
   * 是否反转
   */
  @Prop() reverse: boolean = false;

  render(): any {
    const classes = {
      'ldesign-timeline': true,
      [`ldesign-timeline--${this.mode}`]: true,
      'ldesign-timeline--reverse': this.reverse,
    };

    return (
      <Host class={classes}>
        <slot />
      </Host>
    );
  }
}

/**
 * TimelineItem 时间轴项
 */
@Component({
  tag: 'ldesign-timeline-item',
  styleUrl: 'timeline.less',
  shadow: false,
})
export class LdesignTimelineItem {
  /**
   * 节点颜色
   */
  @Prop() color: 'primary' | 'success' | 'warning' | 'error' | 'gray' = 'primary';

  /**
   * 自定义图标
   */
  @Prop() icon?: string;

  /**
   * 时间戳
   */
  @Prop() timestamp?: string;

  /**
   * 标签文字
   */
  @Prop() label?: string;

  render(): any {
    const classes = {
      'ldesign-timeline-item': true,
      [`ldesign-timeline-item--${this.color}`]: true,
    };

    return (
      <Host class={classes}>
        <div class="ldesign-timeline-item__tail" />
        <div class="ldesign-timeline-item__dot">
          {this.icon ? (
            <ldesign-icon name={this.icon} size="small" />
          ) : (
            <span class="ldesign-timeline-item__dot-inner" />
          )}
        </div>
        <div class="ldesign-timeline-item__content">
          {this.label && (
            <div class="ldesign-timeline-item__label">{this.label}</div>
          )}
          <div class="ldesign-timeline-item__body">
            <slot />
          </div>
          {this.timestamp && (
            <div class="ldesign-timeline-item__timestamp">{this.timestamp}</div>
          )}
        </div>
      </Host>
    );
  }
}



