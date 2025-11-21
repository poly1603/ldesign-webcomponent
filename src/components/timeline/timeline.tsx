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
