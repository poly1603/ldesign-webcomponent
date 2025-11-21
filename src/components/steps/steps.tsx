import { Component, Prop, h, Host } from '@stencil/core';

/**
 * Steps 步骤条组件
 */
@Component({
  tag: 'ldesign-steps',
  styleUrl: 'steps.less',
  shadow: false,
})
export class LdesignSteps {
  /**
   * 当前步骤
   */
  @Prop() current: number = 0;

  /**
   * 步骤条方向
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 步骤条尺寸
   */
  @Prop() size: 'small' | 'default' = 'default';

  /**
   * 当前步骤的状态
   */
  @Prop() status: 'wait' | 'process' | 'finish' | 'error' = 'process';

  render(): any {
    const classes = {
      'ldesign-steps': true,
      [`ldesign-steps--${this.direction}`]: true,
      [`ldesign-steps--${this.size}`]: true,
    };

    return (
      <Host class={classes}>
        <slot />
      </Host>
    );
  }
}
